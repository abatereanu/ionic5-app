import { Component, OnInit } from '@angular/core';
import { FriendListDataService } from '../../services/friend-list-data.service';
import { ActivatedRoute } from '@angular/router';
import { FriendModel } from '../../model/friend.model';
import { FriendListStoreService } from '../../store/friend-list-store.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-friend-list-details',
  templateUrl: './friend-list-details-page.html',
  styleUrls: ['./friend-list-details-page.scss'],
})
export class FriendListDetailsPage implements OnInit {

  public friend: FriendModel;

  constructor(private storeService: FriendListStoreService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const friendId = +paramMap.get('id');
      this.storeService.getFriendById(friendId)
        .subscribe(result => {
          this.friend = result;
          console.log(this.friend);
        })
    })
  }

  onDeleteFriend() {
    //this.dataService
  }

}
