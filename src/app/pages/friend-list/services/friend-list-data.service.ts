import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FriendModel } from '../model/friend.model';

@Injectable({
  providedIn: 'root'
})
export class FriendListDataService {

  constructor(private http: HttpClient) { }

  getFriends() {
    return this.http.get<FriendModel[]>('./assets/jsons/friends.json');
  }
}
