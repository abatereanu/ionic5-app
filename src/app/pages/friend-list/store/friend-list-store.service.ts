import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FriendListState } from './friend-list.state';
import { Observable } from 'rxjs';
import { FriendModel } from '../model/friend.model';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { GetFriendList } from './friend-list.actions';

@Injectable({providedIn: 'root'})
export class FriendListStoreService {

  @Select(FriendListState.getFriends) friends$: Observable<FriendModel[]>;

  constructor(private store: Store) {
  }

  getFriendById(id): Observable<FriendModel> {
    return this.store.select(FriendListState.getFriendById(id));
  }

  @Dispatch()
  getFriendList() {
    return new GetFriendList();
  }
}
