import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/models/shop';
import { User } from 'src/app/models/user';
import { ShopService } from 'src/app/services/shop.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-zaken',
  templateUrl: './zaken.component.html',
  styleUrls: ['./zaken.component.css'],
})
export class ZakenComponent implements OnInit {
  shops: Shop[];
  constructor(
    private service: ShopService,
    private tokens: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.getShopsByOwner();
  }

  getShopsByOwner() {
    let user = this.tokens.getUser();

    this.service.getShopsByOwnerEmail(user.email).subscribe((data) => {
      this.shops = data;
    });
  }
}
