import { Menu } from './menu';
import { Owner } from './owner';

export class Shop {
  constructor(
    public id: BigInteger,
    public naam: String,
    public parking: boolean,
    public rating: BigInteger,
    public uitbater: Owner,
    public menu: Menu
  ) {
    this.naam = naam;
    this.id = id;
    this.parking = parking;
    this.rating = rating;
    this.menu = menu;
    this.uitbater = uitbater;
  }
}
