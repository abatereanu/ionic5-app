import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ApiImage, ImageDataService } from '../../services/image-data.service';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { CONSTANTS } from '../../../../shared/constants/constants';
import { ImageStoreService } from '../store/image-store.service';
import { filter } from 'rxjs/operators';

const { Camera } = Plugins;

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input() formGroup;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  constants = CONSTANTS;
  images: ApiImage[] = [];
  imageIds: string[] = [];

  constructor(
    private imageDataService: ImageDataService,
    private imageStoreService: ImageStoreService,
    private plt: Platform,
    private actionSheetCtrl: ActionSheetController) {
  }

  ngOnInit() {
    this.imageStoreService.images$
      .pipe(filter(images => !!images))
      .subscribe((newImages: ApiImage[]) => {
        this.images = [...newImages];
        this.imageIds = newImages.map(image => image.id);
        this.formGroup.get('images').setValue(this.imageIds);
      });
  }

  async selectImageSource() {
    const buttons = [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        }
      },
      {
        text: 'Choose From Photos Photo',
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      }
    ];

    // Only allow file selection inside a browser
    if (!this.plt.is('hybrid')) {
      buttons.push({
        text: 'Choose a File',
        icon: 'attach',
        handler: () => {
          this.fileInput.nativeElement.click();
        }
      });
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons
    });
    await actionSheet.present();
  }

  async addImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source
    });

    const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
    const imageName = 'Give me a name';

    this.imageDataService.uploadImages(blobData, imageName, image.format)
      .subscribe((newImages: ApiImage[]) => {
        newImages.forEach(newImage => this.images.push(newImage));
      }, error => {
        console.log(error)
      });
  }

  // Used for browser direct file upload
  uploadFile(event: EventTarget) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const files: FileList = target.files;

    this.imageStoreService.uploadImageFiles(files);
  }


  deletePhoto(i: number, image: ApiImage) {
    this.imageStoreService.deleteImage(image.id);
    this.images.splice(i, 1);
  }

  // Helper function
  // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

}
