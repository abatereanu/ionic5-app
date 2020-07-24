import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

const TOKEN_KEY = 'jwt-token';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<any>;
  private userData = new BehaviorSubject(null);

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private plt: Platform,
    private router: Router,
  ) {
    this.loadStoredToken();
  }

  loadStoredToken() {
    let platform$ = from(this.plt.ready());
    this.user = platform$.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY))
      }),
      map(token => {
        console.log('Token from storage', token);
        if (token) {
          let decoded = helper.decodeToken(token);
          console.log('decoded', decoded);
          this.userData.next(decoded);
          return true;
        } else {
          return null;
        }
      })
    )
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post('http://localhost:4000/auth/login', credentials).pipe(
      take(1),
      switchMap((res: any) => {
        let decoded = helper.decodeToken(res.token);
        console.log('login decoded: ', decoded);
        this.userData.next(decoded);

        let storage$ = from(this.storage.set(TOKEN_KEY, res.token));
        return storage$;
      })
    )
  }

  getUser() {
    this.userData.getValue();
  }

  logout() {
    this.storage.remove(TOKEN_KEY)
      .then(() => {
        this.router.navigateByUrl('/');
        this.userData.next(null);
      })
  }


}
