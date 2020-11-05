import { Component, OnInit } from '@angular/core';
import {Zaak} from '../../models/zaak';
import {ZaakService} from '../../services/zaak.service';


@Component({
  selector: 'app-all-zaken',
  templateUrl: './all-zaken.component.html',
  styleUrls: ['./all-zaken.component.css']
})
export class AllZakenComponent implements OnInit {
  zaken:Zaak[];

  constructor(zaakservice:ZaakService) {
    zaakservice.getAllZaken().subscribe(res => this.zaken = res);
   }

  ngOnInit(): void {
  }

}
