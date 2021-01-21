import { Component, OnInit } from '@angular/core';
import { AuctionModel } from '../../../add-auction/models/auction.model';
import { ActivatedRoute } from '@angular/router';
import { AuctionListStoreService } from '../../store/auction-list-store.service';


@Component({
    selector: 'app-auction-details',
    templateUrl: './auction-details.page.html',
    styleUrls: ['./auction-details.page.scss'],
})
export class AuctionDetailsPage implements OnInit {

    slideOpts: any;
    auctionDetails: AuctionModel;

    constructor(private route: ActivatedRoute, private storeService: AuctionListStoreService) {

    }


    ngOnInit(): void {
        this.route.paramMap.subscribe(paramMap => {
            const auctionId = paramMap.get('id');
            this.storeService.getAuctionById(auctionId)
              .subscribe(result => {
                  this.auctionDetails = result;
                  console.log(this.auctionDetails);
              });
        });
        this.slideOpts = {
            initialSlide: 1,
            speed: 400
        };
    }

}
