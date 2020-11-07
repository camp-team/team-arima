import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserData } from 'src/app/interfaces/user-data';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  oldImageUrl: string;
  selectedImageDataUrl: string;
  maxLength = 60;

  user$: Observable<UserData> = this.authService.user$;
  uid: string;

  nameForm: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(this.maxLength),
  ]);

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user$.pipe(map((user) => user.uid)).subscribe((id) => (this.uid = id));
    this.user$
      .pipe(take(1))
      .toPromise()
      .then((user) => {
        this.oldImageUrl = user.avatarUrl || '';
        this.nameForm.patchValue(user.name || '');
      });
  }

  onCroppedImage(image: string): void {
    this.selectedImageDataUrl = image;
  }

  async submit(): Promise<void> {
    let avatarUrl: string;
    if (this.selectedImageDataUrl) {
      avatarUrl = await this.userService.uploadImage(
        this.selectedImageDataUrl,
        this.uid
      );
    } else {
      avatarUrl = this.oldImageUrl;
    }
    const userData: Omit<UserData, 'likedPostIds'> = {
      avatarUrl,
      name: this.nameForm.value,
      uid: this.uid,
    };
    this.userService.updateUser(userData).then(() => {
      this.snackBar.open('更新しました', null);
    });
  }
}
