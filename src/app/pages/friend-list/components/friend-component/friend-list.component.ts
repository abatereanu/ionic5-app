import { Component, OnInit } from '@angular/core';
import { FriendListDataService } from '../../services/friend-list-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendListStoreService } from '../../store/friend-list-store.service';
import { FriendModel } from '../../model/friend.model';

@Component({
  selector: 'app-friend-component',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent implements OnInit {
  friends: FriendModel[];
  originalFriends: FriendModel[];

  constructor(
    private storeService: FriendListStoreService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.storeService.getFriendList();
    this.storeService.friends$.subscribe(response => {
      this.friends = response;
      this.originalFriends = response;
    });
  }

  filterData(data: any) {
    const enteredData = data.target.value;
    this.friends = this.originalFriends.filter(friend => friend.name.toLowerCase().includes(enteredData));
  }

  onItemClicked(friend) {
    this.router.navigate(['details', friend.id], { relativeTo: this.route });
  }

}
