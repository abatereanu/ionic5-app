import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.user.pipe(
      map((user) => {
        if (!user) {
          this.alertCtrl
            .create({
              header: 'Unauthorized',
              message: 'You are not allowed to access that page',
              buttons: ['OK'],
            })
            .then((alert) => alert.present());
          this.router.navigateByUrl('/');
          return false;
        }
        return true;
      }),
    );
  }
}
