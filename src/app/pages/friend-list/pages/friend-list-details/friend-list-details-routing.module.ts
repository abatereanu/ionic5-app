import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FriendListDetailsPage } from './friend-list-details-page';

const routes: Routes = [
  { path: '', component: FriendListDetailsPage, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendListDetailsRoutingModule {}
