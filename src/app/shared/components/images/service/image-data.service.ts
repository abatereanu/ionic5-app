import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONSTANTS } from '../../../constants/constants';

export interface ApiImage {
  id: string;
  name: string;
  createdAt: Date;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImageDataService {
  constructor(private http: HttpClient) {}

  getImages() {
    return this.http.get<ApiImage[]>(`${CONSTANTS.API_URL}/image`);
  }

  uploadImages(blobData: any, name, ext) {
    const formData = new FormData();
    formData.append('file', blobData, `myimage.${ext}`);
    formData.append('name', name);

    return this.http.post(`${CONSTANTS.API_URL}/image`, formData);
  }

  uploadImageFiles(files: FileList) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const ext = files.item(i).name.split('.').pop();
      formData.append('file', files.item(i), `myimage.${ext}`);
      formData.append('name', files.item(i).name);
    }

    return this.http.post<ApiImage[]>(`${CONSTANTS.API_URL}/image`, formData);
  }

  deleteImage(id) {
    return this.http.delete(`${CONSTANTS.API_URL}/image/${id}`);
  }
}
