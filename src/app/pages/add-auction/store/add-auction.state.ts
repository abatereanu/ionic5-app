import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddAuctionDataService } from '../services/add-auction-data.service';
import { AddAuction } from './add-auction.actions';
import { ImageState } from '../components/store/image.state';

@State<any>({
  name: 'auction',
  children: [ImageState]
})
@Injectable()
export class AddAuctionState {

  constructor(private dataService: AddAuctionDataService) {
  }

  @Action(AddAuction)
  createAuction(ctx: StateContext<any>, action: AddAuction) {
    return this.dataService.addAuction(action.auctionData)
  }
}
