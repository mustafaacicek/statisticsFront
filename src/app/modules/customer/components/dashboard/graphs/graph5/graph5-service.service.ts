import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environment/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class Graph5ServiceService {


  constructor(private http: HttpClient) {
  }

  getChart5(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + 'api/motors/getChart5');
  }
}

