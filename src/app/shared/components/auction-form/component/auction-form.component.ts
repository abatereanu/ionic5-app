import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { MatTooltip } from '@angular/material/tooltip';
import carsAndModels from '../../../../../assets/jsons/cars-and-models.json';
import { AuctionModel } from '../../../../pages/add-auction/models/auction.model';
import { AuctionRequestModel } from '../../../../pages/add-auction/models/auction-request.model';
import { AuctionTypeEnum } from '../../../../pages/add-auction/enums/auction-type.enum';

@Component({
  selector: 'app-auction-form',
  templateUrl: './auction-form.component.html',
  styleUrls: ['./auction-form.component.scss'],
})
export class AuctionFormComponent implements OnInit {
  auctionForm: FormGroup;
  @Input() auctionFilledData: AuctionModel;
  @Input() shouldResetForm: Observable<boolean>;
  @Input() editMode: boolean;
  @Output() formSubmitted = new EventEmitter<AuctionRequestModel>();
  @ViewChild('formDirective') formDirective: FormGroupDirective;
  @ViewChild('toolTip') toolTip: MatTooltip;

  carsAndModels = carsAndModels;
  bidStartDate: string;
  bidEndDate: string;
  isEndOfBidVisible = false;
  isMinimumBid = false;
  isFormSubmitted = false;
  availableModels = [];
  toolTipInfo = 'Default Text';

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();

    this.shouldResetForm?.subscribe(() => {
      this.resetForm();
    });

    if (this.editMode) {
      this.availableModels = carsAndModels[this.auctionFilledData.make];
    }
  }

  ionViewDidEnter(): void {
    this.resetForm();
    this.auctionForm
      .get('make')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe(() => {
        this.auctionForm.get('model').enable();
        this.auctionForm.get('model').reset();
      });
  }

  showToolTip(type) {
    switch (type) {
      case AuctionTypeEnum.ABSOLUTE: {
        this.toolTipInfo =
          'Such auctions do not have any minimum bids criteria. The highest bidder gets the product or service';
        break;
      }
      case AuctionTypeEnum.MIN_BID: {
        this.toolTipInfo = 'There is a minimum reserve price below which the product cannot be sold';
        break;
      }
      case AuctionTypeEnum.RESERVE: {
        this.toolTipInfo = 'The seller has the right not to accept the highest bid';
        break;
      }
      default: {
        this.toolTipInfo = 'No bidding allowed. The price is fixed by the seller';
      }
    }

    this.toolTip.show();
    setTimeout(() => this.toolTip.hide(), 8000);
  }

  onMakeSelected(event) {
    this.auctionForm.get('model').enable();
    this.auctionForm.get('model').reset();
    this.availableModels = carsAndModels[event.detail.value];
  }

  onFormSubmitted(formData) {
    const auctionRequest = formData;
    if (!this.auctionForm.invalid) {
      auctionRequest.mileage = +formData.mileage;
      auctionRequest.price = +formData.price;
      auctionRequest.year = dayjs(formData.year).format('YYYY-MM-DD');
      this.formSubmitted.emit(auctionRequest);
    }
  }

  togglePriceFields(event) {
    const selectedType = event.value || event;
    const bidTypes = [AuctionTypeEnum.ABSOLUTE, AuctionTypeEnum.MIN_BID, AuctionTypeEnum.RESERVE];
    const isEndOfBidVisible = bidTypes.includes(selectedType);
    this.isMinimumBid = false;
    this.auctionForm.get('endOfBidDate').disable();
    this.auctionForm.get('minBidPrice').disable();
    this.auctionForm.get('price').enable();

    if (selectedType === AuctionTypeEnum.MIN_BID) {
      this.isMinimumBid = true;
      this.auctionForm.get('minBidPrice').enable();
    }

    if (isEndOfBidVisible) {
      this.auctionForm.get('endOfBidDate').enable();
      this.auctionForm.get('price').disable();
    }
  }

  onEndOfBidClicked() {
    this.bidStartDate = dayjs().add(3, 'day').format();
    this.bidEndDate = dayjs().add(1, 'week').add(3, 'day').format();
  }

  onImagesChanged(newImages) {
    this.auctionForm.get('imageIds').setValue(newImages.map((i) => i.id));
  }

  private initForm() {
    this.auctionForm = this.formBuilder.group({
      auctionType: [this.auctionFilledData?.auctionType, Validators.required],
      title: [this.auctionFilledData?.title, Validators.required],
      make: [this.auctionFilledData?.make, Validators.required],
      model: [this.auctionFilledData?.model, Validators.required],
      year: [this.auctionFilledData?.year, Validators.required],
      mileage: [this.auctionFilledData?.mileage, Validators.required],
      mileageType: [this.auctionFilledData?.mileageType || 'kmh'],
      vehicleState: [this.auctionFilledData?.vehicleState, Validators.required],
      description: [this.auctionFilledData?.description, Validators.required],
      price: [this.auctionFilledData?.price],
      endOfBidDate: [{ value: this.auctionFilledData?.endOfBidDate, disabled: true }],
      minBidPrice: [''],
      imageIds: [this.auctionFilledData?.images.map((i) => i.id)],
    });

    if (!this.editMode) {
      this.auctionForm.get('model').disable({ onlySelf: true });
    } else {
      this.togglePriceFields(this.auctionFilledData.auctionType);
    }
  }

  private resetForm() {
    this.formDirective.resetForm();
    this.isFormSubmitted = false;
    this.initForm();
  }
}
