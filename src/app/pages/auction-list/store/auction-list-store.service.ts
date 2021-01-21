import { Injectable } from '@angular/core';
import { AuctionListState } from './auction-list.state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { GetAuctionList } from './auction-list.actions';
import { AuctionModel } from '../../add-auction/models/auction.model';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';

@Injectable({providedIn: 'root'})
export class AuctionListStoreService {

  @Select(AuctionListState.getAuctions) auctions$: Observable<AuctionModel[]>;
  @SelectSnapshot(AuctionListState.getTotalPages) totalPages: number;

  constructor(private store: Store) {
  }

  getAuctionById(id): Observable<AuctionModel> {
    return this.store.select(AuctionListState.getAuctionById(id));
  }

  @Dispatch()
  getAuctionList(page: number) {
    return new GetAuctionList(page);
  }

}
