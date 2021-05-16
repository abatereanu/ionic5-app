import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import dayjs from 'dayjs';
import { Observable } from 'rxjs';
import carsAndModels from '../../../../../assets/jsons/cars-and-models.json';
import { AuctionModel } from '../../../../pages/add-auction/models/auction.model';
import { AuctionRequestModel } from '../../../../pages/add-auction/models/auction-request.model';

@Component({
  selector: 'app-auction-form',
  templateUrl: './auction-form.component.html',
  styleUrls: ['./auction-form.component.scss'],
})
export class AuctionFormComponent implements OnInit {
  auctionFormGroup: FormGroup;
  @Input() auctionFilledData: AuctionModel;
  @Input() shouldResetForm: Observable<boolean>;
  @Input() editMode: boolean;
  @Output() formSubmitted = new EventEmitter<AuctionRequestModel>();
  @ViewChild('formDirective') formDirective: FormGroupDirective;

  carsAndModels = carsAndModels;
  isFormSubmitted = false;
  availableModels = [];

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();

    this.shouldResetForm.subscribe(() => {
      this.resetForm();
    });

    if (this.editMode) {
      this.availableModels = carsAndModels[this.auctionFilledData.make];
    }
  }

  onMakeSelected(event: CustomEvent) {
    this.auctionFormGroup.get('model').enable();
    this.auctionFormGroup.get('model').reset();
    this.availableModels = carsAndModels[event.detail.value];
  }

  ionViewDidEnter(): void {
    this.resetForm();
    this.auctionFormGroup
      .get('make')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe(() => {
        this.auctionFormGroup.get('model').enable();
        this.auctionFormGroup.get('model').reset();
      });
  }

  onFormSubmitted(formData) {
    const auctionRequest = formData;
    if (!this.auctionFormGroup.invalid) {
      auctionRequest.mileage = +formData.mileage;
      auctionRequest.year = dayjs(formData.year).format('YYYY-MM-DD');
      this.formSubmitted.emit(auctionRequest);
    }
  }

  private initForm() {
    this.auctionFormGroup = this.formBuilder.group({
      title: [this.auctionFilledData?.title, Validators.required],
      make: [this.auctionFilledData?.make, Validators.required],
      model: [this.auctionFilledData?.model, Validators.required],
      year: [this.auctionFilledData?.year, Validators.required],
      mileage: [this.auctionFilledData?.mileage, Validators.required],
      mileageType: [this.auctionFilledData?.mileageType || 'kmh'],
      vehicleState: [this.auctionFilledData?.vehicleState, Validators.required],
      description: [this.auctionFilledData?.description, Validators.required],
      imageIds: [this.auctionFilledData?.images.map((i) => i.id)],
    });

    if (!this.editMode) {
      this.auctionFormGroup.get('model').disable({ onlySelf: true });
    }
  }

  private resetForm() {
    this.formDirective.resetForm();
    this.isFormSubmitted = false;
    this.initForm();
  }
}
