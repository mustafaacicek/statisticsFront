import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environment/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class Graph41serviceService {



  constructor(private http: HttpClient) {
  }

  getChart4a(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + 'api/motors/getChart4');
  }
}
