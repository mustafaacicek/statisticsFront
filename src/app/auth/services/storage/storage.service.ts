import { Injectable } from '@angular/core';

const TOKEN = "TOKEN";
const USER = "USER";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token:string) {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user:any) {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }

  static getToken():string {
    return localStorage.getItem(TOKEN);

  }

  static getUser():any{
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserRole(): string {
    const user=this.getUser();
    if (user ==null)
      return '';
    return user.role;
  }


  static isAdminLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === "ADMIN";
  }

  static isCustomerLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === "CUSTOMER";
  }


  static getUserId():string {
    const user=this.getUser();
    if (user == null)
      return '';
    return user.id;

  }

  static logout():void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }


}
