import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CropperModule } from '@deer-inc/cropper';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';

@NgModule({
  declarations: [SettingsComponent, DeleteUserDialogComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CropperModule,
    MatDialogModule,
  ],
})
export class SettingsModule {}
