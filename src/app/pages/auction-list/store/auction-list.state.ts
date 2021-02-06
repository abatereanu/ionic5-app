import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuctionListDataService } from '../services/auction-list-data.service';
import { tap } from 'rxjs/operators';
import { AuctionModel } from '../../add-auction/models/auction.model';
import { GetAuctionList } from './auction-list.actions';

export interface AuctionListStateModel {
  auctionList: AuctionModel[];
  totalPages: number;
}

@State<AuctionListStateModel>({
  name: 'auctionList',
  defaults: {
    auctionList: null,
    totalPages: 0,
  }
})
@Injectable()
export class AuctionListState {
  constructor(private dataService: AuctionListDataService) {
  }

  @Selector()
  static getAuctions(state: AuctionListStateModel) {
    return state.auctionList;
  }

  @Selector()
  static getTotalPages(state: AuctionListStateModel) {
    return state.totalPages;
  }

  static getAuctionById(id: keyof AuctionListStateModel): (state: AuctionListStateModel) => any {
    return createSelector([AuctionListState], (state) => {
      return state.auctionList.find(auction => auction.id === id);
    });
  }

  @Action(GetAuctionList)
  getAuctionFeed(ctx: StateContext<AuctionListStateModel>, action: GetAuctionList) {
    return this.dataService.getAuctionData(action.page)
      .pipe(tap(response => {
        ctx.patchState({ auctionList: response.data, totalPages: response.totalPages });
      }));
  }
}

