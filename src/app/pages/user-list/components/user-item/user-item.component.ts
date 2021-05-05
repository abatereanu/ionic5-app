import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../../model/user.model';
import { UserListStoreService } from '../../store/user-list-store.service';

@Component({
  selector: 'user-item',
  templateUrl: './user-item.component.html',
})
export class UserItemComponent implements OnInit {
  @Input() users: UserModel[];

  constructor(public readonly userListStoreService: UserListStoreService) {}

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.userListStoreService.getUserList();
  }
}
