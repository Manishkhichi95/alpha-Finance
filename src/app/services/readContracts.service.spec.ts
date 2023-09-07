import { TestBed } from '@angular/core/testing';

import { readContractsService } from './readContracts.service';

describe('BlockchainServiceService', () => {
  let service: readContractsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(readContractsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
