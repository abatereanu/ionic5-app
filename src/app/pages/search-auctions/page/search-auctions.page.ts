import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SearchAuctionsStoreService } from '../store/search-auctions.store.service';
import { SearchAuctionsStateModel } from '../store/search-auctions.state';
import { AuctionListStoreService } from '../../auction-list/store/auction-list-store.service';

@Component({
  selector: 'app-search-auctions',
  templateUrl: './search-auctions.page.html',
  styleUrls: ['./search-auctions.page.scss'],
})
export class SearchAuctionsPage implements OnInit {
  selectedFilters: SearchAuctionsStateModel;
  searchAuctionFormGroup: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchAuctionsStoreService: SearchAuctionsStoreService,
    private auctionListStoreService: AuctionListStoreService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ionViewWillEnter() {
    this.selectedFilters = this.searchAuctionsStoreService.selectedFilters;
    this.searchAuctionFormGroup.get('makeModels').setValue(this.searchAuctionsStoreService.selectedFilters.makeModels);
    this.searchAuctionFormGroup.get('mileageType').setValue(this.searchAuctionsStoreService.selectedFilters.mileageType || 'kmh');
    this.searchAuctionFormGroup.get('mileage').setValue(this.searchAuctionsStoreService.selectedFilters.mileage);
    this.searchAuctionFormGroup.get('vehicleState').setValue(this.searchAuctionsStoreService.selectedFilters.vehicleState);
  }

  initForm() {
    this.searchAuctionFormGroup = this.formBuilder.group({
      makeModels: [],
      mileage: [undefined],
      vehicleState: [undefined],
      mileageType: [],
      dateRange: this.formBuilder.group({
        startDate: [undefined],
        endDate: [undefined],
      }),
    });
  }

  setMakeModelFilter() {
    this.router.navigate(['cars-and-models'], {relativeTo: this.route});
  }


  onSubmitForm(value) {
    if (!this.searchAuctionFormGroup.invalid) {
      this.searchAuctionsStoreService.applyAllFilters({
        makeModels: value.makeModels,
        mileage: value.mileage,
        vehicleState: (value.vehicleState === 'none') ? undefined : value.vehicleState,
        fromYear: value.dateRange.startDate,
        toYear: value.dateRange.endDate,
      });
    }
    this.router.navigateByUrl('tabs/auction-list');
    this.resetSearchFilters();
  }


  transformMileageValue(event: CustomEvent) {
    const mileageValueFormControl = this.searchAuctionFormGroup.get('mileage');
    const milageValue = mileageValueFormControl.value;
    if (milageValue === null) {
      return;
    }
    const finalMilageValue = (event.detail.value === 'mph') ? ((milageValue * 0.6).toFixed()) : ((milageValue / 0.6).toFixed());
    mileageValueFormControl.setValue(finalMilageValue);
  }

  resetSearchFilters() {
    this.searchAuctionFormGroup.reset();
    this.auctionListStoreService.resetAuctionList();
    this.initForm();
  }
}
