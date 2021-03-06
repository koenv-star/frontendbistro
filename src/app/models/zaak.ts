import { Adres } from './adres';
import { Bestelling } from './bestelling';
import { Menu } from './menu';
import { OpeningsUren } from './openings-uren';
import { Reservatie } from './reservatie';
import { Tafel } from './tafel';
import { Uitbater } from './uitbater';

export class Zaak {

  id: number;
  naam: string;
  imageURL: string;
  text: string;
  parking: boolean;
  rating: number;
  openingsUren: OpeningsUren;
  adres: Adres;
  menu: Menu;
  email: string;
  tafels: Tafel[];
  bestellingen: Bestelling[];
  reservaties: Reservatie[];

  constructor(id: number, naam: string, text: string, imageUrl: string, parking: boolean, rating: number, openingsUren: OpeningsUren,
    adres: Adres, menu: Menu, email: string, tafels: Tafel[], bestellingen:Bestelling[], reservaties: Reservatie[]) {

      this.id = id;
      this.naam = naam;
      this.text = text;
      this.imageURL = imageUrl;
      this.parking = parking;
      this.rating = rating;
      this.openingsUren = openingsUren;
      this.adres = adres;
      this.menu = menu;
      this.email = email;
      this.tafels = tafels;
      this.bestellingen = bestellingen;
      this.reservaties = reservaties;
  }
}
