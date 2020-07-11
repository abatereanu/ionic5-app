import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendListDetailsPage } from './friend-list-details-page';
import { FriendListDetailsRoutingModule } from './friend-list-details-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [FriendListDetailsPage],
  imports: [
    IonicModule,
    FriendListDetailsRoutingModule,
    CommonModule
  ]
})
export class FriendListDetailsModule { }
