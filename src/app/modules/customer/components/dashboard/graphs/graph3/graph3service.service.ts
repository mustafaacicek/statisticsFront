import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environment/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class Graph3serviceService {


  constructor(private http: HttpClient) { }

  getChart3(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl+'api/motors/getChart3');
  }

  getChart3part2(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl+'api/motors/getChart3part2');
  }

  getChart3part3(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl+'api/motors/getChart3part3');
  }

}
