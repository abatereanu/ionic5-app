import {Injectable} from '@angular/core';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {AuctionRequestModel} from '../../add-auction/models/auction-request.model';
import {AddAuction} from '../../add-auction/store/add-auction.actions';
import {Select} from '@ngxs/store';
import {SearchAuctionsState} from './search-auctions.state';
import {Observable} from 'rxjs';
import {SelectSnapshot} from '@ngxs-labs/select-snapshot';
import {ApplyAllFilters, ApplyMakeModelFilters, ResetAllFilters} from './search-auctions.actions';

@Injectable({providedIn: 'root'})
export class SearchAuctionsStoreService {

  @Select(SearchAuctionsState.selectedFilters) selectedFilters$: Observable<any>;
  @SelectSnapshot(SearchAuctionsState.selectedFilters) selectedFilters: any;

  @Dispatch()
  applyMakeModelFilters(filters: any) {
    return new ApplyMakeModelFilters(filters);
  }

  @Dispatch()
  applyAllFilters(filters: any) {
    return new ApplyAllFilters(filters);
  }

  @Dispatch()
  resetAllFilters() {
    return new ResetAllFilters();
  }
}
