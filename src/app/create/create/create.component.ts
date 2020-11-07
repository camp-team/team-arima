import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(40)]],
    text: ['', [Validators.required, Validators.maxLength(500)]],
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }
  get text(): FormControl {
    return this.form.get('title') as FormControl;
  }

  ngOnInit(): void {}

  submit(): void {
    this.postService.createPost(this.form.value).then(() => {
      this.snackBar.open('投稿しました🎉', null);
      this.router.navigateByUrl('/');
    });
  }
}
