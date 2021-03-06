import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { ActionSheetController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { CONSTANTS } from '../../../constants/constants';
import { ImageDataService } from '../service/image-data.service';
import { ImageModel } from '../../../../pages/add-auction/models/image.model';

const { Camera } = Plugins;

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit, OnChanges {
  @Input() images: ImageModel[] = [];
  @Input() formGroup: FormGroup;
  @Input() formSubmitted: boolean;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  constants = CONSTANTS;
  imageIds: string[] = [];

  constructor(
    private readonly imageDataService: ImageDataService,
    private readonly plt: Platform,
    private readonly actionSheetCtrl: ActionSheetController,
    private readonly toastController: ToastController,
    private readonly loadingController: LoadingController,
  ) {}

  ngOnInit(): void {
    if (this.images?.length) {
      this.images = [...this.images];
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.formSubmitted?.currentValue) {
      this.images = [];
    }
  }

  async selectImageSource() {
    const buttons = [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        },
      },
      {
        text: 'Choose From Photos Photo',
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        },
      },
    ];

    // Only allow file selection inside a browser
    if (!this.plt.is('hybrid')) {
      buttons.push({
        text: 'Choose a File',
        icon: 'attach',
        handler: () => {
          this.fileInput.nativeElement.click();
        },
      });
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons,
    });
    await actionSheet.present();
  }

  async addImage(source: CameraSource) {
    const loader = await this.loadingController.create({
      message: 'Uploading images...',
    });

    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      saveToGallery: false,
      source,
    });

    loader.present();
    const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
    const imageName = 'Give me a name';

    this.imageDataService.uploadImages(blobData, imageName, image.format).subscribe((newImages) => {
      newImages.forEach((newImage) => {
        this.images = [...this.images];
        this.images.push(newImage);
        this.imageIds = this.images.map((img) => img.id);
        this.formGroup.get('imageIds').setValue(this.imageIds);
        loader.dismiss();
      });
    });
  }

  // Used for browser direct file upload
  async uploadFile(event) {
    const loader = await this.loadingController.create({
      message: 'Uploading images...',
    });
    loader.present();

    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const { files } = target;

    this.imageDataService.uploadImageFiles(files).subscribe(
      (newImages) => {
        newImages.forEach((newImage) => {
          this.images = [...this.images];
          this.images.push(newImage);
          this.imageIds = this.images.map((img) => img.id);
          this.formGroup.get('imageIds').setValue(this.imageIds);
          loader.dismiss();
        });
      },
      async (error) => {
        // TODO: catch this error in global handler
        if (error.status === 0) {
          const toast = await this.toastController.create({
            message: 'No network error. Please try again',
            duration: 4000,
            color: 'danger',
          });

          loader.dismiss();
          toast.present();
        }
      },
    );
  }

  deletePhoto(i: number, image: ImageModel) {
    this.imageDataService.deleteImage(image.id).subscribe(
      async () => {
        this.images.splice(i, 1);
      },
      async () => {
        const toast = await this.toastController.create({
          message: "Selected image doesn't exist",
          duration: 4000,
          color: 'danger',
        });
        this.images.splice(i, 1);
        toast.present();
      },
    );
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

    return new Blob(byteArrays, { type: contentType });
  }
}
