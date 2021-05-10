import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from '../../core/material.module';
import { AddAuctionPage } from './pages/add-auction.page';
import { AddAuctionRoutingModule } from './add-auction-routing.module';
import { AddAuctionState } from './store/add-auction.state';
import { MileageModule } from '../../shared/components/mileage/mileage.module';
import { ImageModule } from '../../shared/components/images/image.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ImageModule,
    MileageModule,
    MaterialModule,
    AddAuctionRoutingModule,
    NgxsModule.forFeature([AddAuctionState]),
  ],
  declarations: [AddAuctionPage],
})
export class AddAuctionModule {}
