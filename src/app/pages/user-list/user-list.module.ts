import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UserListRouting} from './user-list-routing.module';

import {UserListPage} from './pages/user-list/user-list.page';
import {MaterialModule} from '../../core/material.module';
import {UserConfigurationPage} from './pages/user-configuration/user-configuration.page';
import {UserItemComponent} from './components/user-item/user-item.component';
import {NgxsModule} from '@ngxs/store';
import {FriendListState} from '../friend-list/store/friend-list.state';
import {UserListState} from './store/user-list.state';
import {UserListDataService} from './services/user-list-data.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserListRouting,
    ReactiveFormsModule,
    MaterialModule,
    NgxsModule.forFeature([UserListState]),
  ],
  declarations: [UserListPage, UserConfigurationPage, UserItemComponent],
  providers: [UserListDataService],
})
export class UserListModule {}
