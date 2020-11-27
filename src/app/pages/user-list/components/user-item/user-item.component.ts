import {Component, Input, OnInit} from '@angular/core';
import {from} from 'rxjs';
import {UserListDataService} from '../../services/user-list-data.service';
import {Storage} from '@ionic/storage';
import {UserModel} from '../../model/user.model';
import {UserListStoreService} from '../../store/user-list-store.service';


const USER_KEY = 'user_storage';
@Component({
  selector: 'user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {

  @Input() users: Array<UserModel>;


  constructor(private readonly storage: Storage,
              public readonly userListStoreService: UserListStoreService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.userListStoreService.getUserList();

  }

  filterData(data: any) {
    const enteredData = data.target.value;

  }

}
