import { Actions, ofActionCompleted } from '@ngxs/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { delay, filter } from 'rxjs/operators';
import { ActionSheetController, IonInfiniteScroll, IonRefresher, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ApplyAllFilters, ResetAllFilters } from '../../../search-auctions/store/search-auctions.actions';
import { AuctionModel } from '../../../add-auction/models/auction.model';
import { AuctionListStoreService } from '../../store/auction-list-store.service';
import { AuthService } from '../../../../core/components/auth/services/auth.service';
import { CONSTANTS } from '../../../../shared/constants/constants';
import { SearchAuctionsStoreService } from '../../../search-auctions/store/search-auctions.store.service';

@UntilDestroy()
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
  activeFilters = false;

  constructor(
    private menu: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthService,
    private auctionListStoreService: AuctionListStoreService,
    private searchAuctionsStoreService: SearchAuctionsStoreService,
    private router: Router,
    private actions$: Actions,
  ) {}

  ngOnInit(): void {
    this.actions$.pipe(untilDestroyed(this), ofActionCompleted(ApplyAllFilters)).subscribe(() => {
      this.page = 0;
      this.getAuctions(this.page);
      this.activeFilters = this.checkActiveFilters();
    });

    this.actions$.pipe(untilDestroyed(this), ofActionCompleted(ResetAllFilters)).subscribe(() => {
      this.activeFilters = false;
    });

    this.auctionListStoreService.auctions$
      .pipe(
        filter((auctionList) => !!auctionList),
        delay(1000),
      )
      .subscribe((auctionList) => {
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
      this.eventType = 'ionRefresh';
      this.resetAuctionList();
    } else {
      this.page++;
      this.eventType = 'ionInfinite';
    }

    this.getAuctions(this.page);
  }

  getAuctions(page: number) {
    this.auctionListStoreService.getAuctionList(page);
  }

  checkActiveFilters(): boolean {
    if (!this.searchAuctionsStoreService.selectedFilters) {
      return false;
    }
    return Object.values(this.searchAuctionsStoreService.selectedFilters).some((value: string | any) => {
      if (Array.isArray(value)) {
        return value.length;
      }
      return !!value;
    });
  }

  async onFilterIconClick() {
    const actionCtrl = await this.actionSheetCtrl.create({
      header: 'Active Filters',
      buttons: [
        {
          text: 'Clear All Filters',
          handler: () => {
            if (this.activeFilters) {
              this.resetAuctionList(true);
              this.getAuctions(this.page);
            }
          },
        },
        {
          text: 'Apply Filters',
          handler: () => {
            this.router.navigateByUrl('tabs/search-auctions');
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await actionCtrl.present();
  }

  resetAuctionList(resetFilters?: boolean) {
    if (resetFilters) {
      this.searchAuctionsStoreService.resetAllFilters();
    }
    this.auctionListStoreService.resetAuctionList();
    this.page = 0;
    this.infiniteScroll.disabled = false;
  }

  onLogout() {
    this.authService.logout();
  }
}
