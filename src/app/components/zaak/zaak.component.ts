import { Component, OnInit } from '@angular/core';
import { Zaak } from 'src/app/models/zaak';
import { ZaakService } from 'src/app/services/zaak.service';

@Component({
  selector: 'app-zaak',
  templateUrl: './zaak.component.html',
  styleUrls: ['./zaak.component.css']
})
export class ZaakComponent implements OnInit {

  private zaak:Zaak;

  constructor(private zaakService: ZaakService) { }

  public getZaak() {
    this.zaakService.getZaak(1);
  }

  ngOnInit(): void {
    this.getZaak();
  }

}
