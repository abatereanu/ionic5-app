import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user
      .pipe(
        map(user => {
          console.log('in canactivate:', user);
          if (!user) {
            this.alertCtrl.create({
              header: 'Unauthorized',
              message: 'You are not allowed to access that page',
              buttons: ['OK']
            }).then(alert => alert.present());
            this.router.navigateByUrl('/');
            return false;
          } else {
            return true;
          }
        })
      )

  }

}
