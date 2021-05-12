import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../core/components/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
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
  ) {}

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
    this.authService.login(enteredValues).subscribe(
      async (res) => {
        if (res) {
          this.router.navigateByUrl('/tabs').then(() => {
            this.error = null;
            this.loginForm.reset();
            this.formDirective.resetForm();
          });
        }
      },
      async (errorResponse) => {
        const alert = await this.alertCtrl.create({
          header: 'Login Failed',
          message: `${errorResponse.error.message}`,
          buttons: ['OK'],
        });
        await alert.present();
      },
    );
  }
}
