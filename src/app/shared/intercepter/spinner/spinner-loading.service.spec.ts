import { TestBed } from '@angular/core/testing';

import { SpinnerLoadingService } from './spinner-loading.service';

describe('SpinnerLoadingService', () => {
  let service: SpinnerLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
