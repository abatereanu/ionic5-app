import { Component, OnInit } from '@angular/core';
import { FriendListDataService } from '../../services/friend-list-data.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-friend-component',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent implements OnInit {
  friends;
  originalFriends;

  constructor(private dataService: FriendListDataService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.dataService.getFriends('2')
      .subscribe((response => {
        this.friends = response;
        this.originalFriends = response;
      }));
  }

  filterData(data: any) {
    const enteredData = data.target.value;
    this.friends = this.originalFriends.filter(friend => friend.name.toLowerCase().includes(enteredData));
    console.log(data.target.value)
  }

  onItemClicked(friend) {
    this.router.navigate(['details', friend.id], {relativeTo: this.route});
  }

}
