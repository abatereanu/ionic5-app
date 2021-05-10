import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { AddAuctionPage } from './pages/add-auction.page';

const routes: Routes = [{ path: '', component: AddAuctionPage, pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAuctionRoutingModule {}
