import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserListDataService } from '../../services/user-list-data.service';

@Component({
  selector: 'app-user-configuration',
  templateUrl: './user-configuration.page.html',
})
export class UserConfigurationPage implements OnInit {
  roles: ('ADMIN' | 'BUYER' | 'SELLER')[];

  userConfigFormGroup: FormGroup;

  constructor(private readonly userService: UserListDataService, private readonly formBuilder: FormBuilder) {
    this.userConfigFormGroup = this.formBuilder.group({
      rolesControl: [undefined, [Validators.required]],
    });
  }

  ngOnInit() {
    this.getRoles();
    this.getRoles();
  }

  private getRoles() {
    this.userService.getUserRoles().subscribe((roles: ('ADMIN' | 'BUYER' | 'SELLER')[]) => {
      this.roles = roles;
    });
  }
}
