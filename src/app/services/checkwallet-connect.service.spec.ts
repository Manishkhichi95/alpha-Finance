import { TestBed } from '@angular/core/testing';

import { CheckwalletConnectService } from './checkwallet-connect.service';

describe('CheckwalletConnectService', () => {
  let service: CheckwalletConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckwalletConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
