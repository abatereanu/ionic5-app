import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'feed',
        loadChildren: () => import('../pages/feed/feed.module').then(m => m.FeedPageModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('../pages/messages/messages.module').then(m => m.MessagesPageModule)
      },
      {
        path: 'friends',
        loadChildren: () => import('../pages/friend-list/friend-list.module').then(m => m.FriendListPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
