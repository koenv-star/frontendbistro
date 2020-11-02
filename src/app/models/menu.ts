import { MenuItem } from './menu-item';

export class Menu {

  constructor(public id : BigInteger, public menuItems : MenuItem[]) {
    this.id = id;
    this.menuItems = menuItems;
  }
}
