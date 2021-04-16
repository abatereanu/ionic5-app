import { NgModule } from '@angular/core';
import { AddAuctionRoutingModule } from './add-auction-routing.module';
import { AddAuctionPage } from './pages/add-auction.page';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../../core/material.module';
import { NgxsModule } from '@ngxs/store';
import { AddAuctionState } from './store/add-auction.state';
import { ImageModule } from '../../shared/modules/images-module/image.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ImageModule,
    MaterialModule,
    AddAuctionRoutingModule,
    NgxsModule.forFeature([AddAuctionState]),
  ],
  declarations: [
    AddAuctionPage,
  ]
})
export class AddAuctionModule {}
