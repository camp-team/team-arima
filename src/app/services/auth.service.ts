import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uid: string;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  private resolveLogin(): void {
    this.router.navigateByUrl('/');
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
