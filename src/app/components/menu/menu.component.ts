import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie.enum';
import { Menu } from 'src/app/models/menu';
import { MenuItem } from 'src/app/models/menu-item';
import { MenuService } from 'src/app/services/menu.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menu: Menu;
  items: MenuItem[];

  hoofdgerechten: MenuItem[] = new Array();
  desserten: MenuItem[] = new Array();
  cocktails: MenuItem[] = new Array();
  frisdranken: MenuItem[] = new Array();

  constructor(private service: MenuService,
              private serviceToken: TokenStorageService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.getzaak(this.route.snapshot.paramMap.get("zaakNaam"));

  }

  getzaak(naam: String) {
    this.service.showMenuofShop(naam).subscribe((data) => {
      this.menu = data.menu;
      this.items = data.menu.menuItems;
      this.sort();
    });
  }

  getMenu(){
    return this.menu;
  }

  sort() {
    for (let item of this.items) {
      console.log(item.categorie);
      console.log(Categorie.HOOFDGERECHTEN);

      if (item.categorie == Categorie.DESSERTS) {
        this.desserten.push(item);
      } else {
        if (item.categorie == Categorie.HOOFDGERECHTEN) {
          this.hoofdgerechten.push(item);
        } else {
          if (item.categorie === Categorie.FRISDRANKEN) {
            this.frisdranken.push(item);
          } else {
            this.cocktails.push(item);
          }
        }
      }
    }
  }
}
