import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FriendModel } from '../model/friend.model';
import { ApiResponseModel } from '../../../shared/model/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class FriendListDataService {

  constructor(private http: HttpClient) { }

  getFriends() {
    return this.http.get<ApiResponseModel<FriendModel[]>>('https://randomuser.me/api/?results=5000');
  }
}