import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTooltip } from '@angular/material/tooltip';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import type { AuctionModel } from '../../../add-auction/models/auction.model';
import { AuctionListStoreService } from '../../store/auction-list-store.service';
import { CONSTANTS } from '../../../../shared/constants/constants';
import { EditAuctionModalComponent } from '../../components/edit-auction/edit-auction.modal.component';
import { AuctionTypeEnum } from '../../../add-auction/enums/auction-type.enum';

@UntilDestroy()
@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.page.html',
  styleUrls: ['./auction-details.page.scss'],
})
export class AuctionDetailsPage implements OnInit {
  apiUrl = CONSTANTS.API_URL;
  slideOpts: any;
  auctionDetails: AuctionModel;
  currentDate: Date;
  toolTipInfo = 'Default text';
  @ViewChild('toolTip') toolTip: MatTooltip;

  constructor(
    private route: ActivatedRoute,
    private storeService: AuctionListStoreService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private router: Router,
    private routerOutlet: IonRouterOutlet,
  ) {}

  ngOnInit(): void {
    const eventSource = new EventSource(`${CONSTANTS.API_URL}/auction/sse`);
    eventSource.onmessage = ({ data }) => {
      if (data === 'finished') {
        eventSource.close();
      }
    };

    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((paramMap) => {
      const auctionId = paramMap.get('id');
      this.storeService.getAuctionById(auctionId).subscribe((result) => {
        this.auctionDetails = result;
        if (!this.auctionDetails) {
          this.router.navigate(['tabs/auction-list']);
        }
      });
    });
    this.slideOpts = {
      initialSlide: 0,
      speed: 400,
      shadow: true,
      slideShadows: true,
      watchSlidesProgress: true,
    };
  }

  showToolTip(type: string) {
    switch (type) {
      case AuctionTypeEnum.ABSOLUTE: {
        this.toolTipInfo =
          'Such auctions do not have any minimum bids criteria. The highest bidder gets the product or service';
        break;
      }
      case AuctionTypeEnum.MIN_BID: {
        this.toolTipInfo = 'There is a minimum reserve price below which the product cannot be sold';
        break;
      }
      case AuctionTypeEnum.RESERVE: {
        this.toolTipInfo = 'The seller has the right not to accept the highest bid';
        break;
      }
      default: {
        this.toolTipInfo = 'No bidding allowed. The price is fixed by the seller';
      }
    }

    this.toolTip.show();
    setTimeout(() => this.toolTip.hide(), 8000);
  }

  async removeAuction(id) {
    const alert = await this.alertCtrl.create({
      header: 'Remove auction',
      message: 'Are you sure you want to remove the auction?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.storeService.deleteAuctionById(id);
            this.router.navigate(['tabs/auction-list']);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
      ],
    });
    await alert.present();
  }

  async editAuction() {
    const modal = await this.modalCtrl.create({
      cssClass: 'my-custom-class',
      component: EditAuctionModalComponent,
      componentProps: {
        auctionDetails: this.auctionDetails,
      },
      swipeToClose: true,
      showBackdrop: true,
      presentingElement: this.routerOutlet.parentOutlet.nativeEl,
    });
    await modal.present();
  }
}
