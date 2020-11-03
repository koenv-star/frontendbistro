import { Adres } from './adres';
import { Menu } from './menu';
import { OpeningsUren } from './openings-uren';
import { Reservatie } from './reservatie';
import { Tafel } from './tafel';
import { Uitbater } from './uitbater';

export class Zaak {

  id: number;
  naam: string;
  imageURL: string;
  description: string;
  parking: boolean;
  rating: number;
  openingsUren: OpeningsUren;
  adres: Adres;
  menu: Menu;
  email: string;
  tafels: Tafel[];
  reservaties: Reservatie[];

  constructor(id: number, naam: string, description: string, imageUrl: string, parking: boolean, rating: number, openingsUren: OpeningsUren,
    adres: Adres, menu: Menu, email: string, tafels: Tafel[], reservaties: Reservatie[]) {

      this.id = id;
      this.naam = naam;
      this.description = description;
      this.imageURL = imageUrl;
      this.parking = parking;
      this.rating = rating;
      this.openingsUren = openingsUren;
      this.adres = adres;
      this.menu = menu;
      this.email = email;
      this.tafels = tafels;
      this.reservaties = reservaties;
  }
}
