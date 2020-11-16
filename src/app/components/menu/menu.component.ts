import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie.enum';
import { Menu } from 'src/app/models/menu';
import { MenuItem } from 'src/app/models/menu-item';
import { TokenStorageService } from '../../services/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { ZaakService } from 'src/app/services/zaak.service';
import { MenuService } from 'src/app/services/menu.service';
import { Location } from '@angular/common';
import { BestellenService } from 'src/app/services/bestellen.service';
import { Bestelling } from 'src/app/models/bestelling';
import { Zaak } from 'src/app/models/zaak';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menu: Menu;
  items: MenuItem[];
  zaaknaam: string;
  zaakId: number;
  uitbater: string
  user

  hoofdgerechten: MenuItem[] = new Array();
  desserten: MenuItem[] = new Array();
  cocktails: MenuItem[] = new Array();
  frisdranken: MenuItem[] = new Array();

  constructor(
    private service: ZaakService,
    private menuservice: MenuService,
    private serviceToken: TokenStorageService,
    private route: ActivatedRoute,
    private _location: Location,
    private bestellenService:BestellenService,
  ) {}

  ngOnInit(): void {
    this.zaaknaam = this.route.snapshot.paramMap.get('zaakNaam');
    this.service.getzaakByNaam(this.zaaknaam).subscribe(  res => { this.zaakId = res.id; this.uitbater = res.email}); 
    this.user = this.serviceToken.getUser();
 
    if (
      (this.serviceToken.getMenu() === null &&
        this.serviceToken.getZaakNaam == null) ||
      this.serviceToken.getZaakNaam() !== this.zaaknaam
    ) {
      this.serviceToken.saveZaakNaam(this.zaaknaam);
      this.getzaak(this.zaaknaam);
    } else {
      this.menu = this.serviceToken.getMenu();
      this.items = this.menu.menuItems;
      this.sort();
    }
  }

  getzaak(naam: String) {
    this.service.showMenuofShop(naam).subscribe((data) => {
      this.menu = data.menu;
      this.serviceToken.saveMenu(this.menu);
      this.items = data.menu.menuItems;
      this.sort();
    });
  }

  slaMenuOp() {
    this.menuservice.slaMenuOp(this.menu).subscribe((data) => {
      console.log(data);
      this.serviceToken.saveMenu(data);
      location.reload();
    });
  }

  sort() {
    for (let item of this.items) {
      console.log(item.categorie);
      console.log(Categorie.DESSERTS);
      if (item.categorie === Categorie.DESSERTS) {
        this.desserten.push(item);
      } else {
        if (item.categorie === Categorie.HOOFDGERECHTEN) {
          this.hoofdgerechten.push(item);
        } else {
          if (item.categorie === Categorie.FRISDRANKEN) {
            this.frisdranken.push(item);
          } else {  if (item.categorie === Categorie.COCKTAILS) {
            this.cocktails.push(item);
          }
           
          }
        }
      }
    }
  }

  clearMenu() {
    this.menu.menuItems=new Array();
    this.menuservice.slaMenuOp(this.menu).subscribe((data) => {
      this.serviceToken.saveMenu(this.menu);
      location.reload();
    });
  } 

  addToBestellingen(menuItem:MenuItem) {
    if(this.zaaknaam != null || this.zaakId != null)
    this.bestellenService.add( new Bestelling(0, 1, menuItem, this.zaakId, 0), this.zaaknaam);
    let mandje:HTMLElement = document.querySelector(".fa-shopping-bag") as HTMLElement;
    mandje.style.animation = "shake 1s ease ";
    setTimeout(() => {mandje.style.animation = "";}, 1000);
    
  }
  
  goback() {
    this._location.back();
  }
}


