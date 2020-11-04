import { MenuItem } from './menu-item';

export class Bestelling {
  constructor( id:number, aantal:number, menuItem:MenuItem, zaakId:number) {
    this.id = id;
    this.aantal = aantal;
    this.menuItem = menuItem;
    this.zaakId = zaakId;
  }
  
  id: number;
  aantal: number;
  menuItem: MenuItem;
  zaakId: number;
}
