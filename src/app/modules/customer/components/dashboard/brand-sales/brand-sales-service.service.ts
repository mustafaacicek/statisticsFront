import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environment/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class BrandSalesServiceService {

  constructor(private http: HttpClient) { }

  getBrandSalesByMonth(year: number, month: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}api/motors/brands/${year}/${month}`);
  }


}
