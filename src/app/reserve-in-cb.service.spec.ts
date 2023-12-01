import { TestBed } from '@angular/core/testing';

import { ReserveInCBService } from './reserve-in-cb.service';

describe('ReserveInCBService', () => {
  let service: ReserveInCBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReserveInCBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
