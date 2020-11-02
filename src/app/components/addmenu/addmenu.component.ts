import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
      naam: new FormControl(''),
      prijs: new FormControl(''),
      categorie: new FormControl(''),
      beschrijving: new FormControl(''),
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
    console.log(this.menuItems);
    this.menu = new Menu(0, this.menuItems);
    this.tokenservice.saveMenu(this.menu);
    console.log(this.tokenservice.getMenu());
  }

  addMenitems() {}

  get category() {
    return this.menuForm.get('category');
  }
}
