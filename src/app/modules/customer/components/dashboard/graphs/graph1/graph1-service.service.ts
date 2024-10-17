import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environment/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class Graph1ServiceService {


  constructor(private http: HttpClient) { }

  getChart1part1(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl+'api/motors/getChart1part1');
  }

  getChart1part2(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl+'api/motors/getChart1part2');
  }
}
