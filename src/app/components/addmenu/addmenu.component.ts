import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuItem } from 'src/app/models/menu-item';

@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.css'],
})
export class AddmenuComponent implements OnInit {
  menuForm: FormGroup;
  menuItems: MenuItem[] = new Array();
  item: MenuItem;
  constructor() {}

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
    let beschrijving = this.menuForm.value.beschrijving;
    this.item = new MenuItem(null, naam, prijs, beschrijving, categorie);
    this.menuItems.push(this.item);
    this.item = null;
  }
}
