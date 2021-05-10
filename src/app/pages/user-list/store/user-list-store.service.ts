import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { UserModel } from '../model/user.model';
import { UserListState } from './user-list.state';
import { GetUserList } from './user-list.actions';

@Injectable({ providedIn: 'root' })
export class UserListStoreService {
  @Select(UserListState.getUsers) users$: Observable<UserModel[]>;

  @Dispatch()
  getUserList() {
    return new GetUserList();
  }
}
