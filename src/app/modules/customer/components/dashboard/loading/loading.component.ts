import { Component } from '@angular/core';
import {LoadingServiceService} from "./loading-service.service";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})

export class LoadingComponent {
  isLoading: boolean = false;

  constructor(private loadingService: LoadingServiceService) {
    this.loadingService.loading$.subscribe(loading => {
      this.isLoading = loading;
    });
  }
}
