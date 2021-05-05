// eslint-disable-next-line max-classes-per-file
export class GetAuctionList {
  static readonly type = '[Auction List] Get auction list';

  constructor(public page: number) {}
}

export class DeleteAuctionById {
  static readonly type = '[Auction List] Delete auction by id';

  constructor(public id: string) {}
}

export class ResetActionList {
  static readonly type = '[Auction List] Reset auction by id';
}
