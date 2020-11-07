import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Post } from 'src/app/interfaces/post';
import { UserData } from 'src/app/interfaces/user-data';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() post: Post;

  user$: Observable<UserData>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUser(this.post.authorUid).pipe(take(1));
  }
}
