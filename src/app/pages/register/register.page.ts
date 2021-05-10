import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertController, NavController } from '@ionic/angular';

import { AuthService } from '../../core/components/auth/services/auth.service';
import type { UserRequestModel } from '../../core/components/auth/models/user-request.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly navController: NavController,
    private readonly alertController: AlertController,
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [undefined, Validators.required],
      password: [undefined, Validators.required],
      confirmPassword: [undefined, [Validators.required, this.checkPasswordValidator.bind(this)]],
    });
  }

  createUser(formValue: any) {
    const credentials: UserRequestModel = {
      username: formValue.username,
      password: formValue.password,
    };
    this.authService.registerUser(credentials).subscribe(
      () => {
        this.navController.back();
      },
      (error) => {
        this.openAlert(error?.error?.message);
      },
    );
  }

  async openAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  checkPasswordValidator(control: FormControl): { [s: string]: boolean } {
    if (this.registerForm && control.value !== this.registerForm.get('password').value) {
      return { passwordNotMatch: true };
    }

    return null;
  }
}
