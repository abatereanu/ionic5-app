import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AddAuctionStoreService } from '../store/add-auction-store.service';
import { Actions, ofActionCompleted } from '@ngxs/store';
import { AddAuction } from '../store/add-auction.actions';
import dayjs from 'dayjs';

@UntilDestroy()
@Component({
  selector: 'app-add-auction',
  templateUrl: './add-auction.page.html',
  styleUrls: ['./add-auction.page.scss']
})
export class AddAuctionPage implements OnInit {

  @ViewChild('formDirective') formDirective: FormGroupDirective;
  addAuctionForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly storeService: AddAuctionStoreService,
    private readonly actions$: Actions,
    private readonly toastController: ToastController,
    ) {
  }

  public ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addAuctionForm = this.formBuilder.group({
      make: [undefined, Validators.required],
      model: [{ disabled: true, value: undefined }, Validators.required],
      year: ['', Validators.required],
      mileage: ['', Validators.required],
      mileageType: ['kmh'],
      state: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onFormSubmitted(formData) {
    if (!this.addAuctionForm.invalid) {
      formData.mileage = +formData.mileage;
      formData.year = dayjs(formData.year).format('YYYY-MM-DD');
      this.storeService.addAuction(formData);
      this.actions$
        .pipe(ofActionCompleted(AddAuction))
        .subscribe(async (action) => {
          if (!action.result.successful) {
            const toast = await this.toastController.create({
              message: action.result.error.message,
              duration: 4000,
              color: 'primary'
            });

            await toast.present();
          } else {
            const toast = await this.toastController.create({
              message: 'Auction has been successfully added!',
              duration: 4000,
            });

            await toast.present();
            this.resetForm();
          }
        });
    }
  }


  public ionViewDidEnter(): void {
    this.resetForm();
    this.addAuctionForm.get('make').valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(val => {
        console.log(val)
        this.addAuctionForm.get('model').enable();
        this.addAuctionForm.get('model').reset();
      });
  }

  resetForm() {
    this.formDirective.resetForm();
    this.initForm();
  }

  onMakeSelected(e) {
    console.log(e.detail.value)
  }

}
