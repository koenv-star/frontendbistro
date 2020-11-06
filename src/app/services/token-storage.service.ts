import { Injectable } from '@angular/core';
import { Menu } from '../models/menu';
import { User } from '../models/user';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const MENU_KEY = 'menu';
const ZAAK_KEY = 'zaak';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signout() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public getRoleToken(token: string) {
    let jwt = token;

    let jwtData = jwt.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let splitted = decodedJwtJsonData.toString().split(',');
    let preRole = splitted
      .toString()
      .split('"authority":')[1]
      .toString()
      .split(',')[0];
    let actualrole = preRole.substring(1, preRole.length - 3);
    console.log(actualrole);

    return actualrole;
  }

  public saveUser(user: User) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveMenu(menu: Menu) {
    window.sessionStorage.removeItem(MENU_KEY);
    window.sessionStorage.setItem(MENU_KEY, JSON.stringify(menu));
  }

  public getMenu() {
    return JSON.parse(sessionStorage.getItem(MENU_KEY));
  }

  public deleteMenu(){
    sessionStorage.removeItem(MENU_KEY);
  }

  public saveZaakNaam(zaaknaam: String) {
    window.sessionStorage.removeItem(ZAAK_KEY);
    window.sessionStorage.setItem(ZAAK_KEY, JSON.stringify(zaaknaam));
  }

  public getZaakNaam() {
    return JSON.parse(sessionStorage.getItem(ZAAK_KEY));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}
