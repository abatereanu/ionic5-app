import { NgModule } from '@angular/core';
import { FriendListPage } from '../friend-list/pages/friend-list/friend-list.page';
import { FriendListComponent } from '../friend-list/components/friend-component/friend-list.component';
import { AddAuctionRoutingModule } from './add-auction-routing.module';
import { AddAuctionPage } from './pages/add-auction.page';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../../core/material.module';
import { NgxsModule } from '@ngxs/store';
import { AddAuctionState } from './store/add-auction.state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MaterialModule,
    AddAuctionRoutingModule,
    NgxsModule.forFeature([AddAuctionState]),
  ],
  declarations: [
    AddAuctionPage,
  ]
})
export class AddAuctionModule {}
