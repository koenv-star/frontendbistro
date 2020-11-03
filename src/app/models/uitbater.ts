import { Person } from './person';
import { Zaak } from './zaak';
import {BestellingVerzameling} from './bestelling-verzameling';

export class Uitbater extends Person {

  zaken: Zaak[];
  bestellingVerzamelingen: BestellingVerzameling;
}
