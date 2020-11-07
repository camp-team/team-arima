import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uid: string;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  loginWithGoogle(): Promise<firebase.default.auth.UserCredential> {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return this.afAuth.signInWithPopup(provider);
  }

  loginWithTwitter(): Promise<firebase.default.auth.UserCredential> {
    const provider = new firebase.default.auth.TwitterAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return this.afAuth.signInWithPopup(provider);
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}
