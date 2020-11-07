import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private db: AngularFirestore, private authService: AuthService) {}

  async createPost(
    post: Omit<Post, 'postId' | 'createdAt' | 'authorUid'>
  ): Promise<void> {
    console.log(this.authService.uid);
    const postId = this.db.createId();
    const newValue: Post = {
      postId,
      createdAt: Date.now(),
      authorUid: this.authService.uid,
      likeCount: 0,
      ...post,
    };
    await this.db.doc<Post>(`posts/${postId}`).set(newValue);
  }

  getPostById(postId: string): Observable<Post> {
    return this.db.doc<Post>(`posts/${postId}`).valueChanges();
  }

  getPosts(): Observable<Post[]> {
    return this.db.collection<Post>('posts').valueChanges();
  }

  getPostsByAuthorUid(uid: string): Observable<Post[]> {
    return this.db
      .collection<Post>('posts', (ref) => ref.where('authorUid', '==', uid))
      .valueChanges();
  }
}
