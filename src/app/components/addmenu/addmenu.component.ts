import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  menu: Menu;
  constructor(private tokenservice: TokenStorageService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.menuForm =this.formBuilder.group({
      menuItem: this.formBuilder.group({
        naam: new FormControl('', Validators.required),
        prijs: new FormControl('', [
          Validators.pattern('[0-9]{1,3}'),
          Validators.required,
        ]),
        categorie: new FormControl('COCKTAILS', Validators.required),
        beschrijving: new FormControl('', Validators.required)
      })
    });
  }

  get naam() { return this.menuForm.get('menuItem.naam'); }
  get prijs() { return this.menuForm.get('menuItem.prijs'); }
  get categorie() { return this.menuForm.get('menuItem.categorie'); }
  get beschrijving() { return this.menuForm.get('menuItem.beschrijving'); }

  addToMenuItemsList() {

    if(this.menuForm.invalid) {
      this.menuForm.markAllAsTouched();
      return;
    }

    let item: MenuItem = new MenuItem(0, this.naam.value, this.prijs.value, this.beschrijving.value, this.categorie.value);
    this.menuItems.push(item);
  }

  saveMenu() {
    this.menu = this.tokenservice.getMenu();
    for (let item of this.menuItems) {
      this.menu.menuItems.push(item);
    }
    this.tokenservice.saveMenu(this.menu);
    console.log(this.tokenservice.getMenu());
  }
}
