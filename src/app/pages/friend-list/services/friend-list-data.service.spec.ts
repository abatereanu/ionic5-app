import { TestBed } from '@angular/core/testing';

import { FriendListDataService } from './friend-list-data.service';

describe('FriendListDataService', () => {
  let service: FriendListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
