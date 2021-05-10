// eslint-disable-next-line max-classes-per-file
export class ApplyMakeModelFilters {
  static readonly type = '[Search Auctions] Apply Make Model Filters';

  constructor(public filters: any) {}
}

export class ApplyAllFilters {
  static readonly type = '[Search Auctions] Apply All Filters';

  constructor(public filters: any) {}
}

export class ResetAllFilters {
  static readonly type = '[Search Auctions] Reset All Filters';
}
