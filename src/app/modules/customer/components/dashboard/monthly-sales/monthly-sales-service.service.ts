import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../../../environment/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class MonthlySalesServiceService {

  constructor(private http: HttpClient) {}

  getMonthlySales(year: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}api/motors/sales/monthly/${year}`);
  }
}
