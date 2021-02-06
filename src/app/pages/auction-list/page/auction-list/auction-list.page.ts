import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonRefresher, MenuController } from '@ionic/angular';
import { AuthService } from '../../../../shared/services/auth.service';
import { AuctionModel } from '../../../add-auction/models/auction.model';
import { AuctionListStoreService } from '../../store/auction-list-store.service';
import { delay, filter, take } from 'rxjs/operators';
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
  private page: number = 0;

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private storeService: AuctionListStoreService,
  ) {
  }

  public ngOnInit(): void {
    this.getAuctions(this.page);
  }

  public ionViewDidEnter(): void {
    this.infiniteScroll.disabled = this.page === this.storeService.totalPages;
  }

  loadData(event: any) {
    if (event.type === 'ionRefresh') {
      this.page = 0;
      this.infiniteScroll.disabled = false;
    } else {
      this.page++;
    }

    this.getAuctions(this.page, event);
  }

  getAuctions(page: number, event?: any) {
    this.storeService.getAuctionList(page);

    this.storeService.auctions$
      .pipe(
        filter(auctionList => !!auctionList && auctionList.length !== 0),
        take(1),
        delay(1000)
      )
      .subscribe(auctionList => {
        if (event?.type === 'ionRefresh') {
          this.auctionList = auctionList;
          this.refresher.complete();
        } else {
          this.auctionList = this.auctionList.concat(auctionList);
          this.infiniteScroll.complete();
        }
        if (this.page === this.storeService.totalPages) {
          this.infiniteScroll.disabled = true;
        }
      });
  }

  onLogout() {
    this.authService.logout();
  }

}
