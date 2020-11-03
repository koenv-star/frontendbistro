import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../models/menu';
import { Zaak } from '../models/zaak';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  MENU_URL = 'http://localhost:8080/menu';

  constructor(private http: HttpClient) {}

  addMenu(menu: Menu) {
    return this.http.post<Menu>(this.MENU_URL, menu);
  }

  slaMenuOp(menu: Menu) {
   
    return this.http.put<Menu>(this.MENU_URL, menu);
  }
}
