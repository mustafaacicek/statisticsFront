import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environment/environment.prod";


export interface TableData {
  iladı: string;
  sum2018: number;
  sum2019: number;
  sum2020: number;
  sum2021: number;
  sum2022: number;
  sum2023: number;
  sum2024: number;
  toplamSayi: number;
  nufus: number;
  satisNufusOraniYuzde: number;
}

@Injectable({
  providedIn: 'root'
})
export class TableserviceService {
  constructor(private http: HttpClient) {

  }

  getMotorData(): Observable<TableData[]> {
    return this.http.get<TableData[]>(environment.apiUrl+'api/motors/table');

  }
}
