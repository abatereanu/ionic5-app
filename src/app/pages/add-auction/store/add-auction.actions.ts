import { AuctionRequestModel } from '../models/auction-request.model';

export class AddAuction {
  static readonly type = '[Auction] Add new auction';

  constructor(public auctionData: AuctionRequestModel) {
  }
}
