import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { NgModule } from '@angular/core';

import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { AuctionFeedPageRoutingModule } from './auction-list-routing.module';
import { AuctionListPage } from './page/auction-list/auction-list.page';
import { AuctionListState } from './store/auction-list.state';
import { AuctionDetailsPage } from './page/auction-details/auction-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuctionFeedPageRoutingModule,
    MatChipsModule,
    MatIconModule,
    NgxsModule.forFeature([AuctionListState]),
  ],
  declarations: [AuctionListPage, AuctionDetailsPage],
})
export class AuctionListModule {}
