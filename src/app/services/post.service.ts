import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  async createPost(
    post: Omit<Post, 'postId' | 'createdAt' | 'authorUid'>
  ): Promise<void> {
    console.log(this.authService.uid);
    const postId = this.db.createId();
    const newValue: Post = {
      postId,
      createdAt: this.transDate(),
      authorUid: this.authService.uid,
      likedCount: 0,
      ...post,
    };
    await this.db.doc<Post>(`posts/${postId}`).set(newValue);
  }

  private transDate(): string {
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd');
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
