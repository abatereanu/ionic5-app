import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TabsPage } from './page/tabs-page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/auction-list',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'auction-list',
        loadChildren: () => import('../auction-list/auction-list.module').then(m => m.AuctionListModule)
      },
      {
        path: 'search-auctions',
        loadChildren: () => import('../../pages/search-auctions/search-auctions.module').then(m => m.SearchAuctionsModule)
      },
      {
        path: 'add-auction',
        loadChildren: () => import('../../pages/add-auction/add-auction.module').then(m => m.AddAuctionModule)
      },
      {
        path: 'user-list',
        loadChildren: () => import('../user-list/user-list.module').then(m => m.UserListModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../../pages/settings/settings.module').then(m => m.SettingsPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
