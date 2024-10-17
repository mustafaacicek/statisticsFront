import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = StorageService.isAdminLoggedIn() || StorageService.isCustomerLoggedIn();

    if (isLoggedIn && state.url === '/login') {
      if (StorageService.isAdminLoggedIn()) {
        this.router.navigate(['/admin/dashboard']);
      } else if (StorageService.isCustomerLoggedIn()) {
        this.router.navigate(['/customer/dashboard']);
      }
      return false;
    }

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
