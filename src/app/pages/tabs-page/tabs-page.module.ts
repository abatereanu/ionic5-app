import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TabsPage } from './page/tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';


@NgModule({
  imports: [
    IonicModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {
  constructor() {
    console.log('xXXXX')
  }
}
