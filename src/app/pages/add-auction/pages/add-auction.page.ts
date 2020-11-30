import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AddAuctionStoreService } from '../store/add-auction-store.service';
import { AddAuctionDataService } from '../services/add-auction-data.service';
import { Actions, ofAction, ofActionCompleted, ofActionSuccessful } from '@ngxs/store';
import { AddAuction } from '../store/add-auction.actions';

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

  onFormSubmitted(value) {
    if (!this.addAuctionForm.invalid) {
      this.storeService.addAuction(value);
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
            return;
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

  onLogout() {
    //this.authService.logout();
  }
}
