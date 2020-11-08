import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { shouldEventRun, markEventTried } from './utils/should.function';

const db = admin.firestore();

export const countUpLiked = functions
  .region('asia-northeast1')
  .firestore.document('users/{uid}/likePosts/{postId}')
  .onCreate(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then((should: boolean) => {
      if (should) {
        db.doc(`posts/${context.params.postId}`).update(
          'likedCount',
          admin.firestore.FieldValue.increment(1)
        );
        return markEventTried(eventId);
      } else {
        return;
      }
    });
  });

export const countDownLiked = functions
  .region('asia-northeast1')
  .firestore.document('users/{uid}/likePosts/{postId}')
  .onDelete(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then((should: boolean) => {
      if (should) {
        db.doc(`posts/${context.params.postId}`).update(
          'likedCount',
          admin.firestore.FieldValue.increment(-1)
        );
        return markEventTried(eventId);
      } else {
        return;
      }
    });
  });
