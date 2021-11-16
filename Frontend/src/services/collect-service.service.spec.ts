import { TestBed } from '@angular/core/testing';

import { CollecServiceService } from './collect-service.service';

describe('CollecServiceService', () => {
  let service: CollecServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollecServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
