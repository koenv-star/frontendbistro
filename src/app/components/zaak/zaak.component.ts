import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { time } from 'console';
import { Observable, observable, Observer } from 'rxjs';
import { Dag } from 'src/app/models/dag';
import { OpeningsUren } from 'src/app/models/openings-uren';
import { Reservatie } from 'src/app/models/reservatie';
import { Tafel } from 'src/app/models/tafel';
import { Uitbater } from 'src/app/models/uitbater';
import { Zaak } from 'src/app/models/zaak';
import { ZaakService } from 'src/app/services/zaak.service';
import { Time } from '@angular/common';
import { Template } from '@angular/compiler/src/render3/r3_ast';


@Component({
  selector: 'app-zaak',
  templateUrl: './zaak.component.html',
  styleUrls: ['./zaak.component.css']
})
export class ZaakComponent implements OnInit {
 zaak : Zaak = new Zaak();

  constructor(private zaakService: ZaakService, private route: ActivatedRoute) {
    const id:number =  Number(this.route.snapshot.paramMap.get('id'))
    this.getZaak(id).subscribe(res => {
      console.log(res);
      this.zaak.id = res.id;
      this.zaak.naam = res.naam;
      this.zaak.parking = res.parking;
      this.zaak.description = res.description;
      if (res.imageURL == null) this.zaak.imageURL = "assets\\images\\restaurants\\placeholder.jpg";
      else this.zaak.imageURL = res.imageURL
      this.zaak.rating = res.rating;
      this.zaak.openingsUren = res.openingsUren;
      this.zaak.adres = res.adres;
      this.zaak.uitbater = res.uitbater;
      this.zaak.tafels = res.tafels;
      this.zaak.reservaties = res.reservaties;
      this.zaak.menu = res.menu;
      console.log(this.zaak)
      let geslote:Dag = new Dag();
      geslote.naam = "dinsdag";
      geslote.openingsUur = null;
      geslote.sluitingsUur = null;
      this.zaak.openingsUren.dagen[this.zaak.openingsUren.dagen.length] = geslote;
      this.zaak.description = "hierse wa uitleg ofzo";
      console.log(this.zaak.openingsUren.dagen[0].sluitingsUur.toString().substring(0,5));
    });;
  }

  public getZaak(id: number): Observable<Zaak>{
    return this.zaakService.getZaak(id);
  }

  ngOnInit(): void {

  }
  
}
