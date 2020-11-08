import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { UserData } from 'src/app/interfaces/user-data';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.scss'],
})
export class PersonalListComponent implements OnInit {
  user$: Observable<UserData>;
  posts$: Observable<Post[]>;
  uid: string;

  likedPosts$;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.route.paramMap.subscribe((map) => {
      this.uid = map.get('id');
      this.user$ = this.userService.getUser(this.uid);
      this.posts$ = this.postService.getPostsByAuthorUid(this.uid);
      this.likedPosts$ = this.postService.getLikedPosts(this.uid);
    });
  }
}
