import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categorie } from 'src/app/models/categorie.enum';
import { Menu } from 'src/app/models/menu';
import { MenuItem } from 'src/app/models/menu-item';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.css'],
})
export class AddmenuComponent implements OnInit {
  menuForm: FormGroup;
  menuItems: MenuItem[] = new Array();
  item: MenuItem;
  menu: Menu;
  constructor(private tokenservice: TokenStorageService) {}

  ngOnInit(): void {
    this.menuForm = new FormGroup({
      naam: new FormControl('', Validators.required),
      prijs: new FormControl('', [
        Validators.pattern('[0-9]{1,3}'),
        Validators.required,
      ]),
      categorie: new FormControl('', Validators.required),
      beschrijving: new FormControl('', Validators.required),
    });
  }

  addToMenuItemsList() {
    let naam = this.menuForm.value.naam;
    let prijs = this.menuForm.value.prijs;
    let categorie = this.menuForm.value.categorie;
    console.log(categorie);
    let beschrijving = this.menuForm.value.beschrijving;
    this.item = new MenuItem(null, naam, prijs, beschrijving, categorie);
    this.menuItems.push(this.item);
    this.item = null;
  }

  saveMenu() {
    this.menu = this.tokenservice.getMenu();
    for (let item of this.menuItems) {
      this.menu.menuItems.push(item);
    }
    this.tokenservice.saveMenu(this.menu);
    console.log(this.tokenservice.getMenu());
  }

 

  get categorie() {
    return this.menuForm.get('categorie');
  }

  get naam() {
    return this.menuForm.get('naam');
  }

  get prijs() {
    return this.menuForm.get('prijs');
  }

  get beschrijving() {
    return this.menuForm.get('beschrijving');
  }
}
