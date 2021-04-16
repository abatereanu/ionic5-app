import { NgModule } from '@angular/core';
import { ImageModule } from './modules/images-module/image.module';

@NgModule({
  imports: [
    ImageModule
  ],
  exports: [
    ImageModule
  ],
})
export class SharedModule {}
