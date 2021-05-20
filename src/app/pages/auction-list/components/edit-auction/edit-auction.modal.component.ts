import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuctionListStoreService } from '../../store/auction-list-store.service';
import { AuctionModel } from '../../../add-auction/models/auction.model';
import { AuctionRequestModel } from '../../../add-auction/models/auction-request.model';

@UntilDestroy()
@Component({
  selector: 'app-edit-auction',
  templateUrl: './edit-auction.modal.component.html',
})
export class EditAuctionModalComponent {
  @Input() auctionDetails: AuctionModel;

  constructor(private auctionListStoreService: AuctionListStoreService, private modalCtrl: ModalController) {}

  onFormSubmitted(formData: AuctionRequestModel) {
    this.auctionListStoreService.editAuctionById(this.auctionDetails.id, formData);
    this.dismissModal();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
