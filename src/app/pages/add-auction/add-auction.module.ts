import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from '../../core/material.module';
import { AddAuctionPage } from './pages/add-auction.page';
import { AddAuctionRoutingModule } from './add-auction-routing.module';
import { AddAuctionState } from './store/add-auction.state';
import { AuctionFormModule } from '../../shared/components/auction-form/auction-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MaterialModule,
    AddAuctionRoutingModule,
    NgxsModule.forFeature([AddAuctionState]),
    AuctionFormModule,
  ],
  declarations: [AddAuctionPage],
})
export class AddAuctionModule {}
