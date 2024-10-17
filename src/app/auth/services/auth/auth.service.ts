import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environment/environment.prod";


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {}

  signup(signupRequest:any):Observable<any>{
     return  this.http.post(environment.apiUrl+"api/auth/signup",signupRequest)
    }

  login(loginRequest:any):Observable<any>{
    return  this.http.post(environment.apiUrl+"api/auth/login",loginRequest)
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    // Oturumu kapattıktan sonra login sayfasına yönlendirin
  }

}
