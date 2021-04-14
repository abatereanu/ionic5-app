import { ActivatedRoute, Router } from '@angular/router';
import {AlertController, NavController} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { AuctionModel } from '../../../add-auction/models/auction.model';
import { AuctionListStoreService } from '../../store/auction-list-store.service';
import { CONSTANTS } from '../../../../shared/constants/constants';


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
      private router: Router,
      private navController: NavController,
    ) {
    }


    ngOnInit(): void {
      this.route.paramMap.subscribe(paramMap => {
        const auctionId = paramMap.get('id');
        this.storeService.getAuctionById(auctionId)
          .subscribe(result => {
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
          }, {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          }]
      });
      await alert.present();
    }

}
