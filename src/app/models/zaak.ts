import { Adres } from './adres';
import { Menu } from './menu';
import { OpeningsUren } from './openings-uren';
import { Reservatie } from './reservatie';
import { Tafel } from './tafel';
import { Uitbater } from './uitbater';

export class Zaak {

  id: number;
  naam: string;
  omschrijving: string;
  fotoUrl: string;
  parking: boolean;
  rating: number;
  openingsUren: OpeningsUren;
  adres: Adres;
  menu: Menu;
  uitbater: Uitbater;
  tafels: Tafel[];
  reservaties: Reservatie[];
}
