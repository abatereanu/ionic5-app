import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FriendListDetailsPage } from './friend-list-details-page';

describe('FriendListDetailsComponent', () => {
  let component: FriendListDetailsPage;
  let fixture: ComponentFixture<FriendListDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendListDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FriendListDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});