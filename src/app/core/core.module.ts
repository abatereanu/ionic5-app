import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { IonicStorageModule } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { EncodeHttpParamsInterceptorService } from './interceptors/encode-http-params-interceptor.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    HttpClientModule,
    SharedModule,
    IonicStorageModule.forRoot(),
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsSelectSnapshotModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production, maxAge: 10 }),
  ],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: EncodeHttpParamsInterceptorService, multi: true },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
