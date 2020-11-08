import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-carendar',
  templateUrl: './carendar.component.html',
  styleUrls: ['./carendar.component.scss'],
})
export class CarendarComponent implements OnInit {
  @Input() posts: Post[];
  private subscription = new Subscription();
  private readonly preCalendarOption = {
    initialView: 'dayGridMonth',
    weekends: true,
    headerToolbar: {
      left: 'prevYear prev',
      center: 'title',
      right: 'next nextYear',
    },
    events: [],
    locale: 'ja',
    dayCellContent(event) {
      event.dayNumberText = event.dayNumberText.replace('日', '');
    },
    businessHours: true,
  };
  calendarOptions = this.preCalendarOption;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    const dates = this.posts.map((post) => {
      return post.createdAt;
    });
    dates.forEach((date) => {
      this.calendarOptions.events.push({
        date,
        className: 'done',
        overlap: false,
        display: 'background',
      });
    });
    this.calendarOptions.events = [];
    console.log(this.posts);
  }
}
