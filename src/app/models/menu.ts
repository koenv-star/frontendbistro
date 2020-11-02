import { MenuItem } from './menu-item';

export class Menu {

  id: number;
  menuItems: MenuItem[];

  constructor(id: number, menuItems: MenuItem[]) {
    this.id = id;
    this.menuItems = menuItems;
  }
}
