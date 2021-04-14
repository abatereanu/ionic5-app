import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {AuctionListDataService} from '../../auction-list/services/auction-list-data.service';
import {ApplyAllFilters, ApplyMakeModelFilters, ResetAllFilters} from './search-auctions.actions';
import {patch, removeItem} from '@ngxs/store/operators';

export interface SearchAuctionsStateModel {
  makeModels: [{ make: string, model: string }];
  fromYear: number;
  toYear: number;
  mileage: number;
  vehicleState: 'new' | 'used' | 'repair' | 'parts';
}

@State<SearchAuctionsStateModel>({
  name: 'auctionFilters',
  defaults: {
    makeModels: null,
    fromYear: null,
    toYear: null,
    mileage: null,
    vehicleState: null,
  }
})
@Injectable()
export class SearchAuctionsState {
  constructor() {
  }

  @Selector()
  static selectedFilters(state: SearchAuctionsStateModel) {
    return state;
  }

  @Action(ApplyMakeModelFilters)
  applyMakeModelFilters(ctx: StateContext<SearchAuctionsStateModel>, action: ApplyAllFilters) {
    return ctx.setState(patch({makeModels: action.filters.makeModels}));
  }

  @Action(ApplyAllFilters)
  applyFilters(ctx: StateContext<SearchAuctionsStateModel>, action: ApplyAllFilters) {

    return ctx.setState(patch({
      mileage: action.filters.mileage,
      vehicleState: action.filters.vehicleState,
      fromYear: action.filters.startDate,
      toYear: action.filters.endDate,
    }));
  }

  @Action(ResetAllFilters)
  resetAllFilters(ctx: StateContext<SearchAuctionsStateModel>, action: ApplyAllFilters) {
    return ctx.setState(patch({
        makeModels: null,
        fromYear: null,
        toYear: null,
        mileage: null,
        vehicleState: null}
      ));
  }
}
