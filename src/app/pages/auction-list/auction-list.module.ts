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
import { AuctionFormModule } from '../../shared/components/auction-form/auction-form.module';
import { EditAuctionModalComponent } from './components/edit-auction/edit-auction.modal.component';
import { MaterialModule } from '../../core/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    AuctionFeedPageRoutingModule,
    MatChipsModule,
    MatIconModule,
    AuctionFormModule,
    NgxsModule.forFeature([AuctionListState]),
  ],
  declarations: [AuctionListPage, AuctionDetailsPage, EditAuctionModalComponent],
})
export class AuctionListModule {}
