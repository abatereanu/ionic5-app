import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage {
  entered = true;

  constructor(private menu: MenuController) {
    this.openFirst();
  }

  public ionViewDidEnter(): void {
    console.log('enteredd');
    this.menu.enable(this.entered, 'first');
    this.menu.open('first');
    this.entered = !this.entered;
  }


  openFirst() {
  }
}
