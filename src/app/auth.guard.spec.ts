import { AuthGuard } from './auth.guard';
import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';


describe('authGuard', () => {
  const executeGuard: any = (guardParameters: any) =>
    TestBed.runInInjectionContext(() => new AuthGuard(guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
