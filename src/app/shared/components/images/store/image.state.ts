import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
import { DeleteImage, UploadImageFiles } from './image.actions';
import { ImageDataService } from '../service/image-data.service';

@State<any>({
  name: 'image',
  defaults: {
    images: [],
  },
})
@Injectable()
export class ImageState {
  constructor(private dataService: ImageDataService) {}

  @Selector()
  static getImages(state: any) {
    return state.images;
  }

  @Action(UploadImageFiles)
  uploadImageFiles(ctx: StateContext<any>, action: UploadImageFiles) {
    return this.dataService
      .uploadImageFiles(action.images)
      .pipe(
        tap((response) => ctx.setState(patch({ images: ctx.getState().images.concat(response) }))),
      );
  }

  @Action(DeleteImage)
  deleteImage(ctx: StateContext<any>, action: DeleteImage) {
    const images = [...ctx.getState().images];
    const index = images.findIndex((image) => image.id === action.id);
    images.splice(index, 1);
    return this.dataService.deleteImage(action.id).pipe(tap(() => ctx.setState(patch({ images }))));
  }
}
