import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  ActionSheetController,
  Gesture,
  GestureController,
  IonCard,
  LoadingController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CONSTANTS } from '../../../constants/constants';
import { ImageDataService } from '../service/image-data.service';
import { ImageModel } from '../../../../pages/add-auction/models/image.model';
import { approxEq } from '../../../utils/approximatelly-equals';

@UntilDestroy()
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() images: ImageModel[] = [];
  @Input() formGroup: FormGroup;
  @Input() formSubmitted: boolean;
  @Output() imagesChanged = new EventEmitter();

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @ViewChild('dropZone', { read: ElementRef }) dropZone: ElementRef;
  @ViewChildren(IonCard, { read: ElementRef }) imageElements: QueryList<ElementRef>;

  constants = CONSTANTS;
  isIconChanged: boolean;
  imageIds: string[] = [];
  gestureArray: Gesture[] = [];

  constructor(
    private readonly imageDataService: ImageDataService,
    private readonly plt: Platform,
    private readonly actionSheetCtrl: ActionSheetController,
    private readonly toastController: ToastController,
    private readonly loadingController: LoadingController,
    private readonly gestureCtrl: GestureController,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (this.images?.length) {
      this.images = [...this.images];
    }
  }

  public ngAfterViewInit(): void {
    this.imageElements.changes.pipe(untilDestroyed(this)).subscribe(() => {
      if (this.isIconChanged) {
        // Delete old gestures, they will be updated from scratch
        this.gestureArray.forEach((gesture) => gesture.destroy());
        this.updateGestures();
        this.isIconChanged = false;
      }
    });
    this.updateGestures();
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
          this.isIconChanged = true;
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

  updateGestures() {
    let targetElement;
    const imageElementsArray = this.imageElements.toArray();
    // Remove last element since from QueryList it is Add new Photo and it shouldn't be draggable
    imageElementsArray.pop();
    imageElementsArray.forEach((element, index) => {
      const moveGesture = this.gestureCtrl.create({
        el: element.nativeElement,
        threshold: 0,
        gestureName: 'move',
        onStart: () => {
          targetElement = element.nativeElement;
          targetElement.style.opacity = 0.5;
        },
        onMove: (ev) => {
          targetElement.style.transform = `translate(${ev.deltaX}px, ${ev.deltaY}px)`;
        },
        onEnd: () => {
          const targetElementRect = element.nativeElement.getBoundingClientRect();
          if (!this.isTargetInDropZone(targetElementRect)) {
            targetElement.style.transform = `translate(0, 0)`;
            targetElement.style.transition = `.4s ease-out`;
            targetElement.style.opacity = 1;
          } else {
            // Get ElementRef's Rect
            const imageArrayBoundRects = imageElementsArray.map((item) => item.nativeElement.getBoundingClientRect());
            const candidateSwapIndex = this.determineTargetCandidateSwap(imageArrayBoundRects, index);
            if (candidateSwapIndex !== -1) {
              [this.images[index], this.images[candidateSwapIndex]] = [
                this.images[candidateSwapIndex],
                this.images[index],
              ];
            }
            targetElement.style.transition = `.4s ease-out`;
            targetElement.style.transform = `translate(0, 0)`;
            targetElement.style.opacity = 1;
            this.isIconChanged = true;
            this.imagesChanged.emit(this.images);
            this.cdr.detectChanges();
          }
        },
      });

      // Each gesture must be enabled in order to be draggable
      moveGesture.enable(true);
      this.gestureArray.push(moveGesture);
    });
  }

  // Helper function
  // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
  private b64toBlob(b64Data, contentType = '', sliceSize = 512) {
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

  private isTargetInDropZone(targetRect) {
    const dropZoneRect: ClientRect = this.dropZone.nativeElement.getBoundingClientRect();
    return (
      targetRect.left > dropZoneRect.left &&
      targetRect.right < dropZoneRect.right &&
      targetRect.top > dropZoneRect.top &&
      targetRect.bottom < dropZoneRect.bottom
    );
  }

  private determineTargetCandidateSwap(imagesArrayRect, targetIndex): number {
    const targetRect = imagesArrayRect[targetIndex];
    return imagesArrayRect.findIndex((currentElRect, currentIndex) => {
      return (
        approxEq(targetRect.left, currentElRect.left, 50) &&
        approxEq(targetRect.bottom, currentElRect.bottom, 50) &&
        approxEq(targetRect.right, currentElRect.right, 50) &&
        approxEq(targetRect.top, currentElRect.top, 50) &&
        currentIndex !== targetIndex
      );
    });
  }
}
