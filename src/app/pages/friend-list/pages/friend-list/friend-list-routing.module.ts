import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FriendListPage } from './friend-list.page';

const routes: Routes = [
  { path: '', component: FriendListPage, pathMatch: 'full' },
  { path: 'details/:id', loadChildren: () => import('../friend-list-details/friend-list-details.module').then(m => m.FriendListDetailsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendListPageRoutingModule {
}
