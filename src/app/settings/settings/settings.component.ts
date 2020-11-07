import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  oldImageUrl: string;

  maxLength = 60;

  nameForm: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(this.maxLength),
  ]);

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$
      .pipe(take(1))
      .toPromise()
      .then((user) => {
        this.oldImageUrl = user.avatarUrl || '';
        console.log(user);
        console.log(this.oldImageUrl);
        this.nameForm.patchValue(user.name || '');
      });
  }

  onCroppedImage(image: string): void {
    this.oldImageUrl = image;
  }
}
