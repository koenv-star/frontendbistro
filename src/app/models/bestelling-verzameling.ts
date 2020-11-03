import { Bestelling } from './bestelling';
import { Klant } from './klant';

export class BestellingVerzameling {

  id: number;
  bestellingen: Bestelling[];
  klant: Klant;


  constructor(id:number , bestellingen:Bestelling[], klant:Klant) {
    this.id = id;
    this.bestellingen = bestellingen;
    this.klant = klant;
  }
}
