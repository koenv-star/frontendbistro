import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Menu } from 'src/app/models/menu';
import { MenuItem } from 'src/app/models/menu-item';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { JammikValidators } from 'src/app/validators/jammik-validators';

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
        naam: new FormControl('', [Validators.required, JammikValidators.notOnlyWhitespace, Validators.minLength(5)]),
        categorie: new FormControl('COCKTAILS'),
        beschrijving: new FormControl('', [Validators.required, JammikValidators.notOnlyWhitespace, Validators.minLength(20)]),
        prijs: new FormControl('', [Validators.required, JammikValidators.cannotBeNegative, Validators.pattern(/^\d{1,}(\.\d{0,2})?$/)])
      })
    });
  }

  get naam() { return this.menuForm.get('menuItem.naam'); }
  get categorie() { return this.menuForm.get('menuItem.categorie'); }
  get beschrijving() { return this.menuForm.get('menuItem.beschrijving'); }
  get prijs() { return this.menuForm.get('menuItem.prijs'); }

  addToMenuItemsList() {

    if(this.menuForm.invalid) {
      this.menuForm.markAllAsTouched();
      return;
    }

    let item: MenuItem = new MenuItem(0, this.naam.value, this.prijs.value, this.beschrijving.value, this.categorie.value);
    this.menuItems.push(item);
    this.buildForm();
  }

  saveMenu() {
    this.menu = this.tokenservice.getMenu();
    for (let item of this.menuItems) {
      this.menu.menuItems.push(item);
    }
    this.tokenservice.saveMenu(this.menu);
  }
}
