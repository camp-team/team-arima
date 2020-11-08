import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { UserData } from '../interfaces/user-data';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uid: string;
  user$: Observable<UserData> = this.afAuth.authState.pipe(
    switchMap((afUser) => {
      if (afUser) {
        this.uid = afUser?.uid;
        console.log(this.uid);
        return this.userService.getUser(this.uid);
      } else {
        return of(null);
      }
    }),
    shareReplay(1)
  );

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  private resolveLogin(): void {
    this.router.navigateByUrl('home');
    this.snackBar.open('ログインしました', null);
  }

  private rejectLogin(error: { message: any }): void {
    console.error(error.message);
    this.snackBar.open(
      'ログインエラーです。数秒後にもう一度お試しください。',
      null
    );
  }

  loginWithGoogle(): Promise<void> {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return this.afAuth
      .signInWithPopup(provider)
      .then(() => this.resolveLogin())
      .catch((error) => this.rejectLogin(error));
  }

  loginWithTwitter(): Promise<void> {
    const provider = new firebase.default.auth.TwitterAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return this.afAuth
      .signInWithPopup(provider)
      .then(() => this.resolveLogin())
      .catch((error) => this.rejectLogin(error));
  }

  logout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.snackBar.open('ログアウトしました', null);
      this.router.navigateByUrl('/welcome');
    });
  }
}
