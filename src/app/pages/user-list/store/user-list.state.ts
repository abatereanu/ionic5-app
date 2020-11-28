import {UserModel} from '../model/user.model';
import {Injectable} from '@angular/core';
import {UserListDataService} from '../services/user-list-data.service';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {GetUserList} from './user-list.actions';
import {tap} from 'rxjs/operators';
import {patch} from '@ngxs/store/operators';

export interface UserListStateModel {
    users: UserModel[];
}

@State<UserListStateModel>({
    name: 'userList',
    defaults: {
        users: null,
    }
})
@Injectable()
export class UserListState {
    constructor(private userDataService: UserListDataService) {
    }

    @Selector()
    static getUsers(state: UserListStateModel) {
        return state.users;
    }

    @Action(GetUserList)
    getUserList(ctx: StateContext<UserListStateModel>) {
        return this.userDataService.getUsers()
            .pipe(tap(response => ctx.setState(patch({users: response}))));
    }
}
