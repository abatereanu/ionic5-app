import { Actions, ofActionCompleted } from '@ngxs/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { delay, filter } from 'rxjs/operators';
import { IonInfiniteScroll, IonRefresher, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ApplyAllFilters } from '../../../search-auctions/store/search-auctions.actions';
import { AuctionModel } from '../../../add-auction/models/auction.model';
import { AuctionListStoreService } from '../../store/auction-list-store.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { CONSTANTS } from '../../../../shared/constants/constants';


@Component({
  selector: 'app-auction-feed',
  templateUrl: './auction-list.page.html',
  styleUrls: ['./auction-list.page.scss'],
})
export class AuctionListPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonRefresher) refresher: IonRefresher;

  apiUrl = CONSTANTS.API_URL;
  auctionList: AuctionModel[] = [];
  private page = 0;
  eventType = '';

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private auctionListStoreService: AuctionListStoreService,
    private route: Router,
    private actions$: Actions,
  ) {
  }

  ngOnInit(): void {
    console.log(this.route.getCurrentNavigation().extras.state);
    this.actions$
      .pipe(
      ofActionCompleted(ApplyAllFilters)
      )
      .subscribe(() => {
        this.getAuctions(this.page);
      });

    this.auctionListStoreService.auctions$
      .pipe(
        filter(auctionList => !!auctionList),
        delay(1000)
      )
      .subscribe(auctionList => {
        if (this.eventType === 'ionRefresh') {
          this.auctionList = auctionList;
          this.refresher.complete();
        } else {
          this.auctionList = auctionList;
          this.infiniteScroll.complete();
        }
        if (this.page + 1 === this.auctionListStoreService.totalPages) {
          this.infiniteScroll.disabled = true;
        }
      });

    this.getAuctions(this.page);
  }


  loadData(event: any) {
    if (event.type === 'ionRefresh') {
      this.auctionListStoreService.resetAuctionList();
      this.eventType = 'ionRefresh';
      this.page = 0;
      this.infiniteScroll.disabled = false;
    } else {
      this.page++;
      this.eventType = 'ionInfinite';
    }

    this.getAuctions(this.page);
  }

  getAuctions(page: number) {
    this.auctionListStoreService.getAuctionList(page);
  }

  onLogout() {
    this.authService.logout();
  }

}
