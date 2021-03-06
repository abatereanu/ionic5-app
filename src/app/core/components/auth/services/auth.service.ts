import { BehaviorSubject, from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, take } from 'rxjs/operators';

import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import type { UserRequestModel } from '../models/user-request.model';
import { CONSTANTS } from '../../../../shared/constants/constants';

const TOKEN_KEY = 'jwt-token';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: Observable<any>;

  private userData = new BehaviorSubject(null);

  constructor(private storage: Storage, private http: HttpClient, private plt: Platform, private router: Router) {
    this.loadStoredToken();
  }

  loadStoredToken() {
    const platform$ = from(this.plt.ready());
    this.user = platform$.pipe(
      switchMap(() => from(this.storage.get(TOKEN_KEY))),
      map((token) => {
        // eslint-disable-next-line no-console
        console.log('Token from storage', token);
        if (token) {
          const decoded = helper.decodeToken(token);
          // eslint-disable-next-line no-console
          console.log('decoded', decoded);
          this.userData.next(decoded);
          return true;
        }
        return null;
      }),
    );
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${CONSTANTS.API_URL}/auth/login`, credentials).pipe(
      take(1),
      switchMap((res: any) => {
        const decoded = helper.decodeToken(res.token);
        // eslint-disable-next-line no-console
        console.log('login decoded: ', decoded);
        this.userData.next(decoded);

        const storage$ = from(this.storage.set(TOKEN_KEY, res.token));
        return storage$;
      }),
    );
  }

  getUser() {
    this.userData.getValue();
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/');
      this.userData.next(null);
    });
  }

  registerUser(credentials: UserRequestModel): Observable<any> {
    return this.http.post(`${CONSTANTS.API_URL}/auth/register`, credentials);
  }
}
