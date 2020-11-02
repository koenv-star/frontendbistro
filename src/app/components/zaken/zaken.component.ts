import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {Zaak} from '../../models/zaak';
import {ZaakService} from '../../services/zaak.service';

@Component({
  selector: 'app-zaken',
  templateUrl: './zaken.component.html',
  styleUrls: ['./zaken.component.css'],
})
export class ZakenComponent implements OnInit {
  zaken: Zaak[];
  constructor(
    private service: ZaakService,
    private tokens: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.getZakenBijUitbater();
  }

  getZakenBijUitbater() {
    let user = this.tokens.getUser();

    this.service.getZakenBijUitbaterEmail(user.email).subscribe((data) => {
      this.zaken = data;
    });
  }
}
