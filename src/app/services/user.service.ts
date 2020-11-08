import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/user-data';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getUser(uid: string): Observable<UserData> {
    return this.db.doc<UserData>(`users/${uid}`).valueChanges();
  }

  updateUser(userData: Omit<UserData, 'likedPostIds'>): Promise<void> {
    this.uploadImage(userData.avatarUrl, userData.uid);
    return this.db.doc(`users/${userData.uid}`).set(userData, { merge: true });
  }

  async uploadImage(image: string, uid: string): Promise<string> {
    const result = await this.storage
      .ref(`users/${uid}`)
      .putString(image, firebase.default.storage.StringFormat.DATA_URL);
    return result.ref.getDownloadURL();
  }
}
