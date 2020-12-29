import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor  {


  constructor(private alertController: AlertController, private storage: Storage, private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.storage.get('jwt-token'))
      .pipe(
        switchMap(token => {
          request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}` ) });
          request = request.clone({ url: request.url });
          return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                // do nothing for now
              }
              return event;
            }),
            catchError((error: HttpErrorResponse) => {
              const status =  error.status;
              const reason = error?.error.message;

              if (status === 400) {
                this.presentErrorsAlert(status, reason);
              }

              if (status === 401) {
                this.presentLogoutAlert(status, reason);
              }

              return throwError(error);
            })
          );
        })
      );

  }

  async presentErrorsAlert(status: number, reason: any) {
    const alert = await this.alertController.create({
      header: 'Bad Request',
      subHeader: `Validation failed for following fields:`,
      message: this.getFieldsError(reason.errors || reason),
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLogoutAlert(status, reason) {
    const alert = await this.alertController.create({
      header: 'Unauthorized',
      subHeader: reason,
      backdropDismiss: false,
      buttons: [{
        text: 'Logout',
        handler: () => {
          this.authService.logout();
        }
      }]
    });

    await alert.present();
  }

  private getFieldsError(errors: any[] | string) {
    if (typeof errors === 'string') {
      return errors;
    }
    let errorMessages = '';
    errors.forEach(e => {
       errorMessages += `<p> ${e.errorMessage} </p>`
    });

    return errorMessages;
  }

}
