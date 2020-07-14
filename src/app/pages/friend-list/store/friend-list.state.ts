import { Action, createSelector, Selector, SelectorOptions, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { FriendModel } from '../model/friend.model';
import { FriendListDataService } from '../services/friend-list-data.service';
import { GetFriendList } from './friend-list.actions';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface FriendListStateModel {
  friendList: FriendModel[];
}

@State<FriendListStateModel>({
  name: 'friendList',
  defaults: {
    friendList: null,
  }
})
@Injectable()
export class FriendListState {
  constructor(private dataService: FriendListDataService) {
  }

  @Selector()
  static getFriends(state: FriendListStateModel) {
    return state.friendList;
  }

  // DynamicSelector
  static getFriendById(id: keyof FriendListStateModel): (state: FriendListStateModel) => FriendModel {
    return createSelector([FriendListState], (state) => {
      return state.friendList.find(f => f.id === +id);
    });
  }

  @Action(GetFriendList)
  getFriendList(ctx: StateContext<FriendListStateModel>) {
    return this.dataService.getFriends()
      .pipe(tap(response => ctx.patchState({ friendList: response })))
  }
}
