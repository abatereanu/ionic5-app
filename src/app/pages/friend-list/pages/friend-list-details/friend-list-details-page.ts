import { Component, OnInit } from '@angular/core';
import { FriendListDataService } from '../../services/friend-list-data.service';

@Component({
  selector: 'app-friend-list-details',
  templateUrl: './friend-list-details-page.html',
  styleUrls: ['./friend-list-details-page.scss'],
})
export class FriendListDetailsPage implements OnInit {

  constructor(private dataService: FriendListDataService) { }

  ngOnInit() {}

  onDeleteFriend() {
    this.dataService
  }

}
