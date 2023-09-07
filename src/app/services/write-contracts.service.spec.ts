import { TestBed } from '@angular/core/testing';

import { WriteContractsService } from './write-contracts.service';

describe('WriteContractsService', () => {
  let service: WriteContractsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WriteContractsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
