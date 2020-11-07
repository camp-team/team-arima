import { Component, OnInit } from '@angular/core';
import { CropperOptions } from '@deer-inc/cropper';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  oldImageUrl: string;

  constructor() {}

  ngOnInit(): void {}

  onCroppedImage(image: string): void {
    console.log(image);
  }
}
