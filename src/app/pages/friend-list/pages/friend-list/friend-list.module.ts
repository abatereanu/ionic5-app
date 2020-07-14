import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendListPageRoutingModule } from './friend-list-routing.module';

import { FriendListPage } from './friend-list.page';
import { FriendListComponent } from '../../components/friend-component/friend-list.component';
import { NgxsModule } from '@ngxs/store';
import { FriendListState } from '../../store/friend-list.state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxsModule.forFeature([FriendListState]),
    FriendListPageRoutingModule
  ],
  declarations: [
    FriendListPage,
    FriendListComponent,
  ]
})
export class FriendListPageModule {}
