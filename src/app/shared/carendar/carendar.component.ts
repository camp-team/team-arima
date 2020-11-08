import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';

@Component({
  selector: 'app-carendar',
  templateUrl: './carendar.component.html',
  styleUrls: ['./carendar.component.scss'],
})
export class CarendarComponent implements OnInit {
  @Input() posts: Post[];

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

  constructor() {}

  ngOnInit(): void {
    this.calendarOptions = this.preCalendarOption;
    const dates = this.posts.map((post) => {
      return post.createdAt;
    });
    dates.forEach((date) => {
      this.calendarOptions.events.push({
        start: date,
        end: date,
        className: 'fc-done',
      });
    });
  }
}
