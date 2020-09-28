import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DailySectionComponent } from './daily-section.component';
import { FormModalModule } from '../../form-modal/form-modal.module';
import { FormModalComponent } from '../../form-modal/form-modal.component';

@NgModule({
  declarations: [DailySectionComponent],
  imports: [
    CommonModule,
    FormsModule,
    FormModalModule
  ],
  exports: [DailySectionComponent, FormModalComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class DailySelectionModule { }
