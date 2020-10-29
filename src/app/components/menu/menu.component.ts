import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { MenuItem } from 'src/app/models/menu-item';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menu: Menu;
  items: MenuItem[];

  constructor(private service: MenuService) {}

  ngOnInit(): void {this.getzaak("bijmemhet")}

  getzaak(naam: String) {
    this.service.showMenuofShop(naam).subscribe((data) => {
      this.menu = data.menu;
      this.items = data.menu.menuItems;
    });
  }
}
