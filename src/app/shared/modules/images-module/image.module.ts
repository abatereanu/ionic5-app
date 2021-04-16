import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { ImageState } from './store/image.state';
import { ImageComponent } from './image.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([ImageState]),
  ],
  declarations: [
    ImageComponent
  ],
  providers: [
  ],
  exports: [
    ImageComponent
  ],
})
export class ImageModule {}
