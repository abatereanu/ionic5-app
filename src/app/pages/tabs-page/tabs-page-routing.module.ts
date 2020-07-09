import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TabsPage } from './page/tabs-page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'friend-list',
        loadChildren: () => import('../../pages/friend-list/friend-list.module').then(m => m.FriendListPageModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('../../pages/messages/messages.module').then(m => m.MessagesPageModule)
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
  },
  {
    path: '',
    redirectTo: '/tabs/feed',
    pathMatch: 'full'
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
