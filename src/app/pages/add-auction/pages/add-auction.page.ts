import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Actions, ofActionCompleted } from '@ngxs/store';
import { take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AddAuction } from '../store/add-auction.actions';
import { AddAuctionStoreService } from '../store/add-auction-store.service';
import { AuctionRequestModel } from '../models/auction-request.model';

@UntilDestroy()
@Component({
  selector: 'app-add-auction',
  templateUrl: './add-auction.page.html',
})
export class AddAuctionPage {
  resetForm: Subject<boolean> = new Subject();

  constructor(
    private readonly storeService: AddAuctionStoreService,
    private readonly actions$: Actions,
    private readonly toastController: ToastController,
  ) {}

  onFormSubmitted(formData: AuctionRequestModel) {
    this.actions$.pipe(ofActionCompleted(AddAuction), take(1)).subscribe(async (action) => {
      if (!action.result.successful) {
        const { error } = action.result;
        const toast = await this.toastController.create({
          message: (error as any).error?.message || error.message,
          duration: 4000,
          color: 'danger',
        });
        await toast.present();
      } else {
        const toast = await this.toastController.create({
          message: 'Auction has been successfully added!',
          duration: 4000,
        });
        await toast.present();
        this.resetForm.next(true);
      }
    });
    this.storeService.addAuction(formData);
  }
}
