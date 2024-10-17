import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environment/environment.prod";

export interface SalesData {
  il: string;
  markaSatislar: { marka: string; toplamSayi: number }[];
  totalSales: number;
  cssClass: string;
}

@Injectable({
  providedIn: 'root'
})

export class CityTableService {

  constructor(private http: HttpClient) { }

  getCitySalesData(): Observable<SalesData[]> {
    return this.http.get<SalesData[]>(environment.apiUrl+'api/motors/city-table/2024');
  }
}
