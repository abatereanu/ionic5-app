import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { AuctionListPage } from './page/auction-list/auction-list.page';
import { AuctionDetailsPage } from './page/auction-details/auction-details.page';

const routes: Routes = [
  {
    path: '',
    component: AuctionListPage,
    pathMatch: 'full',
  },
  {
    path: 'details/:id',
    component: AuctionDetailsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuctionFeedPageRoutingModule {}
