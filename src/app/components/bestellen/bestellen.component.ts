import { Component, OnInit } from '@angular/core';
import { Bestelling } from 'src/app/models/bestelling';
import { BestellingVerzameling } from 'src/app/models/bestelling-verzameling';
import { Categorie } from 'src/app/models/categorie.enum';
import { Klant } from 'src/app/models/klant';
import { MenuItem } from 'src/app/models/menu-item';
import { BestellenService } from 'src/app/services/bestellen.service';

@Component({
  selector: 'app-bestellen',
  templateUrl: './bestellen.component.html',
  styleUrls: ['./bestellen.component.css']
})
export class BestellenComponent implements OnInit {
  besVer:BestellingVerzameling;
  catLijst: Categorie;
  zaken: string[];

  constructor(private bestellenService:BestellenService) {
    this.update();
  }

  update() {
    if (this.bestellenService.getBestellingen() == null) {
      this.besVer =  new BestellingVerzameling(0, new Array(), new Klant());
    } else {
      this.besVer = this.bestellenService.getBestellingen();
    }
    if(this.bestellenService.getZaakNamen() == null) {
      this.zaken = Array();
    } else {
      this.zaken = this.bestellenService.getZaakNamen();
    }
    let menuItem = new MenuItem(0, "eten", 15, "lekker", Categorie.DESSERTS);
    let bestelling = new Bestelling();
    bestelling.menuItem = menuItem;
    bestelling.aantal = 5;
    bestelling.zaakId= 5;
    this.besVer.bestellingen[0] = bestelling;
    this.zaken[0] = "jos vos bistro";
    let menuItem2 = new MenuItem(0, "iets", 15, "niet zo lekker", Categorie.COCKTAILS);
    let bestelling2 = new Bestelling();
    bestelling2.menuItem = menuItem2;
    bestelling2.aantal = 5;
    bestelling2.zaakId= 5;
    this.besVer.bestellingen[1] = bestelling2;
    this.zaken[1] = "whatevewr";
  }

  getCategorie(cat:Categorie) {
    return Categorie[cat];
  }

  updateItem(event) {
    let id = event.target.id;
    this.besVer.bestellingen[id].aantal = event.target.value;
    if(event.target.value <= 0) {
      document.getElementById(id).remove();
      this.besVer.bestellingen.splice(id, 1);
      this.zaken.splice(id,1);
      this.bestellenService.saveBestellingen(this.besVer);
      this.bestellenService.saveZaakNamen(this.zaken);
    }
  }

  ngOnInit(): void {
    this.update();
  }
}
