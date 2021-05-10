import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../../../shared/constants/constants';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserListDataService {
  constructor(private readonly http: HttpClient) {}

  getUserRoles(): Observable<any> {
    return this.http.get(`${CONSTANTS.API_URL}/roles`);
  }

  getUsers(): Observable<any> {
    return this.http.get<UserModel>(`${CONSTANTS.API_URL}/users`);
  }
}
