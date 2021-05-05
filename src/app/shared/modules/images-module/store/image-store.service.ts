import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { DeleteImage, UploadImageFiles } from './image.actions';
import { ImageState } from './image.state';
import { ApiImage } from '../service/image-data.service';

@Injectable({ providedIn: 'root' })
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
