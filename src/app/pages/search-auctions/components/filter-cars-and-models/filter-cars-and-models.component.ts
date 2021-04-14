import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import carsAndModels from '../../../../../assets/jsons/cars-and-models.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SearchAuctionsStoreService } from '../../store/search-auctions.store.service';
import {filter} from 'rxjs/operators';
import {SearchAuctionsStateModel} from '../../store/search-auctions.state';
import {Router} from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-filter-cars-and-models',
  templateUrl: './filter-cars-and-models.component.html',
  styleUrls: ['./filter-cars-and-models.component.scss'],
})
export class FilterCarsAndModelsComponent implements OnInit {

  carsAndModels = carsAndModels;
  availableModels = [];
  filteredItems: { make: string, model: string }[] = [];
  searchCarsModelsForm = new FormGroup({});
  isErrorMessage: boolean;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly storeService: SearchAuctionsStoreService,
    ) {
  }

  ngOnInit() {
    this.isErrorMessage = false;
    this.searchCarsModelsForm = this.formBuilder.group({
      make: [undefined, Validators.required],
      model: [{ disabled: true, value: undefined }, Validators.required],
    });

    this.searchCarsModelsForm.get('make').valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        console.log('x')
        this.searchCarsModelsForm.get('model').reset(undefined);
      });
  }

  ionViewDidEnter() {
    this.getFilters();
    console.log(this.filteredItems);
  }

  onFormSubmitted(selectedItem) {
    console.log(selectedItem)
    this.isErrorMessage = false;
    if (this.searchCarsModelsForm.invalid || this.isAnyFilterPresent(selectedItem)) {
      return;
    }
    this.removeRedundantItems(selectedItem);

    const hasDuplicate = this.filteredItems.find(i => i.make === selectedItem.make && i.model === selectedItem.model);
    if (!hasDuplicate && this.filteredItems.length <= 2) {
      this.filteredItems.push(selectedItem);
      this.isErrorMessage = false;
    } else if (this.filteredItems.length > 2) {
      this.isErrorMessage = true;
      return;
    }
    this.isErrorMessage = false;
  }

  onMakeSelected(event: CustomEvent) {
    this.searchCarsModelsForm.get('model').enable()
    this.availableModels = carsAndModels[event.detail.value];
  }

  onDeleteFilter(position) {
    this.filteredItems.splice(position, 1);
  }

  removeRedundantItems(selectedItem) {
    if (selectedItem.model === 'Any') {
      this.filteredItems = this.filteredItems.filter(item => item.make !== selectedItem.make);
    }
  }

  isAnyFilterPresent(selectedItem) {
    return this.filteredItems?.find(item => item.make === selectedItem.make && item.model === 'Any');
  }

  getFilterModel(model: string) {
    return model !== 'Any' ? model : '';
  }

  applyFilters() {
    console.log(this.filteredItems)
    this.storeService.applyMakeModelFilters({ makeModels: this.filteredItems });
  }

  getFilters() {
    this.storeService.selectedFilters$
      .subscribe((selectedFilters: SearchAuctionsStateModel) => {
        if (selectedFilters.makeModels) {
          selectedFilters.makeModels.forEach((filteredItem: {model: string; make: string}) => {
            return this.filteredItems = this.filteredItems.concat(filteredItem);
          });
        }
    });
  }

}
