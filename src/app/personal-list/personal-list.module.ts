import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalListRoutingModule } from './personal-list-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PersonalListComponent } from './personal-list/personal-list.component';

@NgModule({
  declarations: [PersonalListComponent],
  imports: [CommonModule, PersonalListRoutingModule, MatTabsModule],
})
export class PersonalListModule {}
