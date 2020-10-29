import { BestellingVerzameling } from './bestelling-verzameling';
import { Person } from './person';
import { Reservatie } from './reservatie';

export class Klant extends Person {

  reservateis: Reservatie[];
  bestellingVerzamelingen: BestellingVerzameling;
}
