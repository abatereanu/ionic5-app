import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuctionListPage } from './auction-list.page';

describe('AuctionFeedPage', () => {
  let component: AuctionListPage;
  let fixture: ComponentFixture<AuctionListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuctionListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
