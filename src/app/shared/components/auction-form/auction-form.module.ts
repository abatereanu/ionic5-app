import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuctionFormComponent } from './component/auction-form.component';
import { ImageModule } from '../images/image.module';
import { MileageModule } from '../mileage/mileage.module';
import { MaterialModule } from '../../../core/material.module';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, ImageModule, MileageModule, MaterialModule],
  declarations: [AuctionFormComponent],
  providers: [],
  exports: [AuctionFormComponent],
})
export class AuctionFormModule {}
