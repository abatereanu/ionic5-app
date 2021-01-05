import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddAuctionDataService } from '../services/add-auction-data.service';
import { AddAuction } from './add-auction.actions';

export interface AuctionStateModel {
  make: string;
  model: string;
  year: string;
  mileage: string;
  mileageType: 'kmh' | 'mph';
  state: 'new' | 'used' | 'repair';
  description?: string;
}

@State<AuctionStateModel>({
  name: 'auction',
})
@Injectable()
export class AddAuctionState {

  constructor(private dataService: AddAuctionDataService) {
  }

  @Action(AddAuction)
  createAuction(ctx: StateContext<AuctionStateModel>, action: AddAuction) {
    return this.dataService.addAuction(action.auctionData)
  }
}
