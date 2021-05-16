import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { append, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AuctionListDataService } from '../services/auction-list-data.service';
import type { AuctionModel } from '../../add-auction/models/auction.model';
import { buildParams } from '../../../shared/utils/build-params';
import { DeleteAuctionById, EditAuctionById, GetAuctionList, ResetActionList } from './auction-list.actions';
import { SearchAuctionsStoreService } from '../../search-auctions/store/search-auctions.store.service';
import type { SearchAuctionParamsModel } from '../../search-auctions/model/search-auction-params.model';

export interface AuctionListStateModel {
  auctionList: AuctionModel[];
  totalPages: number;
}

@State<AuctionListStateModel>({
  name: 'auctionList',
  defaults: {
    auctionList: null,
    totalPages: 0,
  },
})
@Injectable()
export class AuctionListState {
  constructor(
    private dataService: AuctionListDataService,
    private searchAuctionStoreService: SearchAuctionsStoreService,
  ) {}

  @Selector()
  static getAuctions(state: AuctionListStateModel) {
    return state.auctionList;
  }

  @Selector()
  static getTotalPages(state: AuctionListStateModel) {
    return state.totalPages;
  }

  static getAuctionById(id: keyof AuctionListStateModel): (state: AuctionListStateModel) => any {
    return createSelector([AuctionListState], (state) => state.auctionList.find((auction) => auction.id === id));
  }

  @Action(GetAuctionList)
  getAuctionFeed(ctx: StateContext<AuctionListStateModel>, action: GetAuctionList) {
    const filters: SearchAuctionParamsModel = this.searchAuctionStoreService.selectedFilters;

    const finalParams = {
      'make-models': filters?.makeModels?.map((value) => {
        const { make } = value;
        const { model } = value;

        return `${make}+${model}`;
      }),
      limit: 10,
      mileage: filters?.mileage,
      vehicleState: filters?.vehicleState,
      fromYear: filters?.fromYear,
      toYear: filters?.toYear,
      page: action?.page,
    };

    const params: any = buildParams(finalParams);

    return this.dataService.getAuctionList(params).pipe(
      tap((response) => {
        ctx.setState(patch({ auctionList: append(response.data), totalPages: response.totalPages }));
      }),
    );
  }

  @Action(DeleteAuctionById)
  deleteActionItemById(ctx: StateContext<AuctionListStateModel>, action: DeleteAuctionById) {
    return this.dataService.removeAuctionById(action.id).pipe(
      tap(() => {
        ctx.setState(
          patch({
            auctionList: removeItem<AuctionModel>((auction) => auction.id === action.id),
          }),
        );
      }),
    );
  }

  @Action(ResetActionList)
  resetAuctionList(ctx: StateContext<AuctionListStateModel>) {
    ctx.patchState({ auctionList: null });
  }

  @Action(EditAuctionById)
  editAuctionById(ctx: StateContext<AuctionListStateModel>, action: EditAuctionById) {
    return this.dataService.editAuctionById(action.id, action.payload).pipe(
      tap((response: AuctionModel) => {
        ctx.setState(
          patch({
            auctionList: updateItem<AuctionModel>((auction) => auction.id === action.id, response),
          }),
        );
      }),
    );
  }
}
