import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const showAssetDetails = localStorage.getItem('showAssetDetails');

    if (showAssetDetails === 'true') {
      return true;
    } else {
      this.router.navigate(['/market']);
      return false;
    }
  }
}