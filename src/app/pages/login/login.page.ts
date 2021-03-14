import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  error = null;
  loginForm: FormGroup;
  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private fb: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onFormSubmitted(enteredValues) {
    if (this.loginForm.valid) {
      this.login(enteredValues);
    }
  }

  private login(enteredValues) {
    this.authService.login(enteredValues).subscribe(async res => {
        if (res) {
          this.router.navigateByUrl('/tabs').then(() => {
            this.error = null;
            this.loginForm.reset();
            this.formDirective.resetForm();
          });
        }
      },
      async errorResponse => {
        const alert = await this.alertCtrl.create({
          header: 'Login Failed',
          message: `${errorResponse.error.message}`,
          buttons: ['OK']
        });
        await alert.present();
      });
  }

}
