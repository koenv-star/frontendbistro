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
    this.zaken = new Array();
    this.service.getZakenBijUitbaterEmailVoorDisplay(user.email).subscribe(res => {res.forEach(x => {
      this.zaken[this.zaken.length] = new Zaak(x.id, x.naam, x.text,x.imageURL,null,null,null,null,null,null,null,null,null);
    });
    console.log(this.zaken)
  });
  }
}
