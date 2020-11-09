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
    this.zaken = new Array();
    zaakservice.getAllZaken().subscribe(res => {res.forEach(x => {
      this.zaken[this.zaken.length] = new Zaak(x.id, x.naam, x.description,x.imageURL,null,null,null,null,null,null,null,null,null);
    })});
   }

  ngOnInit(): void {
  }

}
