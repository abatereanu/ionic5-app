import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendListDataService {

  constructor(private http: HttpClient) { }

  getFriends(params) {
    return this.http.get('./assets/jsons/friends.json')
  }
}
