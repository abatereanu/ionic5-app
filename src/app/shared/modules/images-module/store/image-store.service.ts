import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { DeleteImage, UploadImageFiles } from './image.actions';
import { Select } from '@ngxs/store';
import { ImageState } from './image.state';
import { Observable } from 'rxjs';
import { ApiImage } from '../service/image-data.service';

@Injectable({providedIn: 'root'})
export class ImageStoreService {

  @Select(ImageState.getImages) images$: Observable<ApiImage[]>;

  @Dispatch()
  uploadImageFiles(images: FileList) {
    return new UploadImageFiles(images);
  }

  @Dispatch()
  deleteImage(id: string) {
    return new DeleteImage(id);
  }
}
