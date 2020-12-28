export class UploadImageFiles {
  static readonly type = '[Auction] Upload Image Files';

  constructor(public images: FileList) {
  }
}

export class DeleteImage {
  static readonly type = '[Auction] Delete Image';

  constructor(public id: string) {
  }
}
