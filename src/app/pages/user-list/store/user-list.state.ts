import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
import { UserListDataService } from '../services/user-list-data.service';
import { GetUserList } from './user-list.actions';
import { UserModel } from '../model/user.model';

export interface UserListStateModel {
  users: UserModel[];
}

@State<UserListStateModel>({
  name: 'userList',
  defaults: {
    users: null,
  },
})
@Injectable()
export class UserListState {
  constructor(private userDataService: UserListDataService) {}

  @Selector()
  static getUsers(state: UserListStateModel) {
    return state.users;
  }

  @Action(GetUserList)
  getUserList(ctx: StateContext<UserListStateModel>) {
    return this.userDataService.getUsers().pipe(tap((response) => ctx.setState(patch({ users: response }))));
  }
}
