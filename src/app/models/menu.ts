import { MenuItem } from './menu-item';

export class Menu {

  constructor(public id : number, public menuItems : MenuItem[]) {
    this.id = id;
    this.menuItems = menuItems;
  }
}
