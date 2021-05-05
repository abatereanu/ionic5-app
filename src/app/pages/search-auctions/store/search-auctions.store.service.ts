import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { SearchAuctionsState } from './search-auctions.state';
import { ApplyAllFilters, ApplyMakeModelFilters, ResetAllFilters } from './search-auctions.actions';

@Injectable({ providedIn: 'root' })
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
