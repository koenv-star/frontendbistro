import { Component, OnInit } from '@angular/core';
import { BestellingVerzameling } from 'src/app/models/bestelling-verzameling';
import { Categorie } from 'src/app/models/categorie.enum';
import { BestellenService } from 'src/app/services/bestellen.service';

@Component({
  selector: 'app-bestellen',
  templateUrl: './bestellen.component.html',
  styleUrls: ['./bestellen.component.css']
})
export class BestellenComponent implements OnInit {
  besVer:BestellingVerzameling;
  zaken: string[];
  total: number = 0;
  message: string;

  constructor(private bestellenService:BestellenService) {
    this.update();
    this.besVer.bestellingen.forEach(x => {
      this.total += (x.aantal * x.menuItem.prijs);
    })
  }


  update() {
    if (this.bestellenService.getBestellingen() == null) {
      this.besVer =  new BestellingVerzameling(0, new Array(), null, null);
    } else {
      this.besVer = this.bestellenService.getBestellingen();
    }
    if(this.bestellenService.getZaakNamen() == null) {
      this.zaken = Array();
    } else {
      this.zaken = this.bestellenService.getZaakNamen();
    }
    this.message = this.bestellenService.getMessage();
    if(this.message == null) {
      this.message = "";
      this.bestellenService.saveMessage(this.message);
    }
  }

  getCategorie(cat:Categorie) {
    return Categorie[cat];
  }

  updateItem(event) {
    if(event.target.id != "message") {
      let id = event.target.id;
      if(this.besVer.bestellingen[id].aantal < event.target.value) {
        this.total += this.besVer.bestellingen[id].menuItem.prijs;
      }
      else {
        this. total -= this.besVer.bestellingen[id].menuItem.prijs;
      }
      this.besVer.bestellingen[id].aantal = event.target.value;
      this.bestellenService.saveBestellingen(this.besVer);
      if(event.target.value <= 0) {
        document.getElementById(id).remove();
        this.besVer.bestellingen.splice(id, 1);
        this.zaken.splice(id,1);
        this.bestellenService.saveBestellingen(this.besVer);
        this.bestellenService.saveZaakNamen(this.zaken);
      }
    } else {
      let inputbox = document.querySelector("#message") as HTMLInputElement;
      this.message = inputbox.value;
      this.bestellenService.saveMessage(this.message);
    }
  }

  process(){
    this.bestellenService.postBestelling(this.total, this.message);
    document.getElementById("bag").innerHTML = "";
    this.message = "";
    this.bestellenService.saveMessage(this.message);
  }

  ngOnInit(): void {
    this.update();
  }
}
