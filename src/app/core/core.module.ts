import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../environments/environment';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    HttpClientModule,
    IonicStorageModule.forRoot(),
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsSelectSnapshotModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production, maxAge: 10})
  ],
  declarations: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.',
      );
    }
  }
}
