import { MenuItem } from './menu-item';

export class Bestelling {
  constructor( id:number, aantal:number, menuItem:MenuItem, zaakId:number, bestellingVerzamelingId: number) {
    this.id = id;
    this.aantal = aantal;
    this.menuItem = menuItem;
    this.zaakId = zaakId;
    this.bestellingVerzamelingId = bestellingVerzamelingId;
  }
  
  id: number;
  aantal: number;
  menuItem: MenuItem;
  zaakId: number;
  bestellingVerzamelingId: number;
}
