import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalListRoutingModule } from './personal-list-routing.module';
import { PersonalListComponent } from './personal-list/personal-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [PersonalListComponent],
  imports: [
    CommonModule,
    PersonalListRoutingModule,
    SharedModule,
    MatTabsModule,
  ],
})
export class PersonalListModule {}
