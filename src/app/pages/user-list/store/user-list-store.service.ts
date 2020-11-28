import {Injectable} from '@angular/core';
import {UserListState} from './user-list.state';
import {Observable} from 'rxjs';
import {UserModel} from '../model/user.model';
import {Select, Store} from '@ngxs/store';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {GetUserList} from './user-list.actions';

@Injectable({providedIn: 'root'})
export class UserListStoreService {

  @Select(UserListState.getUsers) users$: Observable<UserModel[]>;

  @Dispatch()
  getUserList() {
    return new GetUserList();
  }
}
