import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environment/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class Graph2serviceService {


  constructor(private http: HttpClient) { }

  getChart2(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl+'api/motors/getChart2');
  }


}
