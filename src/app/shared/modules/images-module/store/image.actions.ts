// eslint-disable-next-line max-classes-per-file
export class UploadImageFiles {
  static readonly type = '[Shared] Upload Image Files';

  constructor(public images: FileList) {}
}

export class DeleteImage {
  static readonly type = '[Shared] Delete Image';

  constructor(public id: string) {}
}
