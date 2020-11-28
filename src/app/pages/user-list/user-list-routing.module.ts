import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListPage } from './pages/user-list/user-list.page';
import {UserConfigurationPage} from './pages/user-configuration/user-configuration.page';

const routes: Routes = [
  {
    path: '',
    component: UserListPage
  },
  {
    path: 'details/:id',
    component: UserConfigurationPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserListRouting {}
