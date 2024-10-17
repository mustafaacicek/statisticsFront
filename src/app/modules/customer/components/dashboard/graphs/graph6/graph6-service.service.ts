import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environment/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class Graph6ServiceService {


  constructor(private http: HttpClient) {
  }
  getGraph6(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl +'api/motors/getChart6');
  }
}
