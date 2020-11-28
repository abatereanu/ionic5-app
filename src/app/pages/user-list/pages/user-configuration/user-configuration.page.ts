import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserListDataService} from '../../services/user-list-data.service';


const USER_KEY = 'user_storage';
@Component({
  selector: 'app-user-configuration',
  templateUrl: './user-configuration.page.html',
  styleUrls: ['./user-configuration.page.scss'],
})
export class UserConfigurationPage implements OnInit {

  roles: Array<'ADMIN' | 'BUYER' | 'SELLER'>;
  userConfigFormGroup: FormGroup;

  constructor(
      private readonly userService: UserListDataService,
      private readonly formBuilder: FormBuilder,
  ) {
    this.userConfigFormGroup = this.formBuilder.group({
      rolesControl: [undefined, [Validators.required]],
    });
  }


  ngOnInit() {
    this.getRoles();
  }


  submitForm(formValue: any) {

  }


  private getRoles() {
    this.userService.getUserRoles().subscribe((roles: Array<'ADMIN' | 'BUYER' | 'SELLER'>) => {
      this.roles = roles;
    });
  }

}
