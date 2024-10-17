import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { StorageService } from './auth/services/storage/storage.service';
import {LoadingServiceService} from "./modules/customer/components/dashboard/loading/loading-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})export class AppComponent implements OnInit {
  showNavbar = true;
  isAdminLoggedIn = false;
  isCustomerLoggedIn = false;
  currentRoute: string;

  constructor(private router: Router,
              private loadingService:LoadingServiceService) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !(event.url === '/login' || event.url === '/signup');
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
        this.currentRoute = event.url; // Mevcut route'u saklıyoruz
      }
    });
  }

  onCardClick2(){
    this.router.navigate(['/graph2']);

  }


  onCardClick(cardName: string) {
    const newRoute = `/statistics/${cardName}`;

    if (this.currentRoute === newRoute) {
      this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
        this.router.navigate([newRoute]);
      });
    } else {
      this.router.navigate([newRoute]);
    }
  }

  navigateToTable() {
    this.router.navigate(['/table']);
  }

  navigateToTable2() {
    this.router.navigate(['/city-table']);
  }

  navigateToGraph1() {
    this.router.navigate(['/graph1']);
  }

  navigateToGraph2() {
    this.router.navigate(['/graph2']);
  }
  navigateToGraph3() {
    this.router.navigate(['/graph3']);
  }
  navigateToGraph3a() {
    this.router.navigate(['/graph3-1']);
  }
  navigateToGraph4() {
    this.router.navigate(['/graph4']);
  }
  navigateToGraph4a() {
    this.router.navigate(['/graph4-1']);
  }
  navigateToGraph5() {
    this.router.navigate(['/graph5']);
  }
  navigateToGraph6() {
    this.router.navigate(['/graph6']);
  }

  logout() {
    StorageService.logout();
    this.router.navigate(['/login']);
  }


  navigateToHome() {
    this.router.navigate(['/customer/dashboard']);
  }

  navigateWithLoading() {
    this.loadingService.show();
    // 1 saniye bekledikten sonra yönlendirme yap
    setTimeout(() => {
      this.router.navigate(['/next-route']);
      this.loadingService.hide();
    }, 500);
  }



}
