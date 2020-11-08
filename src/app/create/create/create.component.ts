import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(40)]],
    text: ['', [Validators.required, Validators.maxLength(500)]],
    link: ['', [Validators.maxLength(500)]],
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  get titleControl(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get textControl(): FormControl {
    return this.form.get('text') as FormControl;
  }

  get linkControl(): FormControl {
    return this.form.get('link') as FormControl;
  }

  ngOnInit(): void {}

  submit(): void {
    this.postService.createPost(this.form.value).then(() => {
      this.snackBar.open('今日もよく頑張りました！🎉', null);
      this.router.navigateByUrl('/');
    });
  }
}
