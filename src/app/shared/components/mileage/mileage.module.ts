import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MileageComponent } from './component/mileage.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FormsModule, ReactiveFormsModule],
  declarations: [MileageComponent],
  exports: [MileageComponent],
})
export class MileageModule {}
