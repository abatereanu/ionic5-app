import { catchError, flatMap, take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertController, NavController } from '@ionic/angular';

import { AuthService } from '../../shared/services/auth.service';
import { UserRequestModel } from '../../shared/model/user-request.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  roles: Array<'ADMIN' | 'BUYER' | 'SELLER'>;

  constructor(
      private readonly formBuilder: FormBuilder,
      private readonly authService: AuthService,
      private readonly navController: NavController,
      private readonly alertController: AlertController,
  ) {
  }


  ngOnInit() {
    this.getRoles();
    this.registerForm = this.formBuilder.group({
      username: [undefined, Validators.required],
      password: [undefined, Validators.required],
      confirmPassword: [undefined, [Validators.required, this.checkPasswordValidator.bind(this)]],
      rolesControl: [undefined, [Validators.required]],
    });
  }


  createUser(formValue: any) {
    const credentials: UserRequestModel = {
      username: formValue.username,
      password: formValue.password,
      roles: formValue.rolesControl,
    };
    this.authService.registerUser(credentials)
        .subscribe((response) => {
          this.navController.back();
        }, error => {
          this.openAlert(error?.error?.message);
        });
  }


  async openAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }


  private getRoles() {
    this.authService.getUserRoles().subscribe((roles: Array<'ADMIN' | 'BUYER' | 'SELLER'>) => {
      this.roles = roles;
    });
  }


  checkPasswordValidator(control: FormControl): {[s: string]: boolean} {
    if (this.registerForm && (control.value !== this.registerForm.get('password').value)) {
      return {passwordNotMatch: true};
    }

    return null;
  }

}
