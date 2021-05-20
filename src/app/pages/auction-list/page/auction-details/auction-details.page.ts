import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import type { AuctionModel } from '../../../add-auction/models/auction.model';
import { AuctionListStoreService } from '../../store/auction-list-store.service';
import { CONSTANTS } from '../../../../shared/constants/constants';
import { EditAuctionModalComponent } from '../../components/edit-auction/edit-auction.modal.component';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.page.html',
  styleUrls: ['./auction-details.page.scss'],
})
export class AuctionDetailsPage implements OnInit {
  apiUrl = CONSTANTS.API_URL;
  slideOpts: any;
  auctionDetails: AuctionModel;

  constructor(
    private route: ActivatedRoute,
    private storeService: AuctionListStoreService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private router: Router,
    private routerOutlet: IonRouterOutlet,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const auctionId = paramMap.get('id');
      this.storeService.getAuctionById(auctionId).subscribe((result) => {
        this.auctionDetails = result;
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
