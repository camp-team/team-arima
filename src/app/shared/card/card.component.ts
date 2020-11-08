import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Post } from 'src/app/interfaces/post';
import { UserData } from 'src/app/interfaces/user-data';
import { AuthService } from 'src/app/services/auth.service';
import { LikeService } from 'src/app/services/like.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() post: Post;

  author$: Observable<UserData>;
  user$: Observable<UserData> = this.authService.user$;
  uid: string;
  isLiked: boolean;
  likedCount: number;

  constructor(
    private userService: UserService,
    private likeService: LikeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.author$ = this.userService.getUser(this.post.authorUid).pipe(take(1));
    this.user$
      .pipe(take(1))
      .toPromise()
      .then((user) => {
        this.uid = user.uid;
        this.likeService
          .isLikedPost(this.post.postId, this.uid)
          .pipe(take(1))
          .subscribe((isLiked) => {
            this.isLiked = isLiked;
          });
      });
    this.likedCount = this.post.likedCount;
  }

  likePost(): void {
    this.isLiked = true;
    this.likedCount++;
    this.likeService.likePost(this.post.postId, this.uid);
  }

  unLikePost(): void {
    this.isLiked = false;
    this.likedCount--;
    this.likeService.unLikePost(this.post.postId, this.uid);
  }
}
