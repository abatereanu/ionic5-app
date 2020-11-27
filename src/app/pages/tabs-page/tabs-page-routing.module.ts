import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TabsPage } from './page/tabs-page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/feed',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'friend-list',
        loadChildren: () => import('../friend-list/pages/friend-list/friend-list.module').then(m => m.FriendListPageModule)
      },
      {
        path: 'user-list',
        loadChildren: () => import('../user-list/user-list.module').then(m => m.UserListModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../../pages/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'feed',
        loadChildren: () => import('../../pages/feed/feed.module').then(m => m.FeedPageModule)
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
