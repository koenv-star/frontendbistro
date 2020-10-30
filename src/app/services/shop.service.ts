import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shop } from '../models/shop';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}
  SHOPS_URL = 'http://localhost:8080/zaken';
  getShopsByOwnerEmail(email: String) {
    let url = `${this.SHOPS_URL}/${email}`;

    return this.http.get<Shop[]>(url);
  }
}
