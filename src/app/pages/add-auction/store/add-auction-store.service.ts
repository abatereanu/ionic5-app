import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import type { AuctionRequestModel } from '../models/auction-request.model';
import { AddAuction } from './add-auction.actions';

@Injectable({ providedIn: 'root' })
export class AddAuctionStoreService {
  @Dispatch()
  addAuction(data: AuctionRequestModel) {
    return new AddAuction(data);
  }
}
