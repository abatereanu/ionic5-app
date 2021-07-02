import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import carsAndModels from '../../../../../assets/jsons/cars-and-models.json';
import { SearchAuctionsStoreService } from '../../store/search-auctions.store.service';

@UntilDestroy()
@Component({
  selector: 'app-filter-cars-and-models',
  templateUrl: './filter-cars-and-models.component.html',
  styleUrls: ['./filter-cars-and-models.component.scss'],
})
export class FilterCarsAndModelsComponent implements OnInit {
  carsAndModels = carsAndModels;

  availableModels = [];

  filteredItems: { make: string; model: string }[] = [];

  searchCarsModelsForm = new FormGroup({});

  constructor(private readonly formBuilder: FormBuilder, private readonly storeService: SearchAuctionsStoreService) {}

  ngOnInit() {
    this.searchCarsModelsForm = this.formBuilder.group({
      make: [undefined, Validators.required],
      model: [{ disabled: true, value: undefined }, Validators.required],
    });

    this.filteredItems = [...this.storeService.selectedFilters.makeModels];

    this.searchCarsModelsForm
      .get('make')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe(() => {
        this.searchCarsModelsForm.get('model').reset(undefined);
      });
  }

  onFormSubmitted(selectedItem) {
    if (this.searchCarsModelsForm.invalid || this.isAnyFilterPresent(selectedItem)) {
      return;
    }
    this.removeRedundantItems(selectedItem);

    const hasDuplicate = this.filteredItems?.find(
      (i) => i.make === selectedItem.make && i.model === selectedItem.model,
    );
    if (!hasDuplicate && this.filteredItems.length <= 4) {
      this.filteredItems.push(selectedItem);
    }
  }

  onMakeSelected(event) {
    this.searchCarsModelsForm.get('model').enable();
    this.availableModels = carsAndModels[event.detail.value];
  }

  onDeleteFilter(position) {
    this.filteredItems.splice(position, 1);
  }

  removeRedundantItems(selectedItem) {
    if (selectedItem.model === 'Any') {
      this.filteredItems = this.filteredItems.filter((item) => item.make !== selectedItem.make);
    }
  }

  isAnyFilterPresent(selectedItem) {
    return this.filteredItems?.find((item) => item.make === selectedItem.make && item.model === 'Any');
  }

  getFilterModel(model: string) {
    return model !== 'Any' ? model : '';
  }

  applyFilters() {
    this.storeService.applyMakeModelFilters({ makeModels: this.filteredItems });
  }
}
