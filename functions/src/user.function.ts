const functions = require('firebase-functions');
const admin = require('firebase-admin');

export const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((user: any) => {
    const userData = {
      name: user.displayName || '',
      avatarURL: user.photoURL?.replace('_nomal', '') || '',
      uid: user.uid,
    };
    return db.doc(`users/${user.uid}`).set(userData);
  });
