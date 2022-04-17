import { TestBed } from '@angular/core/testing';

import { UserchangeService } from './userchange.service';

describe('UserchangeService', () => {
  let service: UserchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
