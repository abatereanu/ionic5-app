import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuctionFeedPageRoutingModule } from './auction-list-routing.module';

import { AuctionListPage } from './page/auction-list/auction-list.page';
import { NgxsModule } from '@ngxs/store';
import { AuctionListState } from './store/auction-list.state';
import { AuctionDetailsPage } from './page/auction-details/auction-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuctionFeedPageRoutingModule,
    NgxsModule.forFeature([AuctionListState]),
  ],
  declarations: [
    AuctionListPage,
    AuctionDetailsPage
  ]
})
export class AuctionListModule {}
