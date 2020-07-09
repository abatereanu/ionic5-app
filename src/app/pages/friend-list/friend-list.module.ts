import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendListPageRoutingModule } from './friend-list-routing.module';

import { FriendListPage } from './page/friend-list.page';
import { FriendComponentComponent } from './components/friend-component/friend-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendListPageRoutingModule
  ],
  declarations: [
    FriendListPage,
    FriendComponentComponent
  ]
})
export class FriendListPageModule {}
