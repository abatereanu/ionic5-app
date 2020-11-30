import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddAuctionDataService } from '../services/add-auction-data.service';
import { AddAuction } from './add-auction.actions';

@State<any>({name: 'auction'})
@Injectable()
export class AddAuctionState {

  constructor(private dataService: AddAuctionDataService) {
  }

  @Action(AddAuction)
  getFriendList(ctx: StateContext<any>, action: AddAuction) {
    return this.dataService.addAuction(action.auctionData)
  }
}
