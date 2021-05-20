// eslint-disable-next-line max-classes-per-file
import { AuctionRequestModel } from '../../add-auction/models/auction-request.model';

export class GetAuctionList {
  static readonly type = '[Auction List] Get auction list';

  constructor(public page: number) {}
}

export class DeleteAuctionById {
  static readonly type = '[Auction List] Delete auction by id';

  constructor(public id: string) {}
}

export class ResetActionList {
  static readonly type = '[Auction List] Reset auction';
}

export class EditAuctionById {
  static readonly type = '[Auction List] Edit auction by id';

  constructor(public id: string, public payload: AuctionRequestModel) {}
}
