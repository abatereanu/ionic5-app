import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';

import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { AuctionListState } from './auction-list.state';
import type { AuctionModel } from '../../add-auction/models/auction.model';
import { DeleteAuctionById, GetAuctionList, ResetActionList } from './auction-list.actions';

@Injectable({ providedIn: 'root' })
export class AuctionListStoreService {
  @Select(AuctionListState.getAuctions) auctions$: Observable<AuctionModel[]>;
  @SelectSnapshot(AuctionListState.getTotalPages) totalPages: number;

  constructor(private store: Store) {}

  getAuctionById(id): Observable<AuctionModel> {
    return this.store.select(AuctionListState.getAuctionById(id));
  }

  @Dispatch()
  getAuctionList(page: number) {
    return new GetAuctionList(page);
  }

  @Dispatch()
  deleteAuctionById(id: string) {
    return new DeleteAuctionById(id);
  }

  @Dispatch()
  resetAuctionList() {
    return new ResetActionList();
  }
}
