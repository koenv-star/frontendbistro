import { Bestelling } from './bestelling';
import { Klant } from './klant';

export class BestellingVerzameling {

  id: number;
  bestellingen: Bestelling[];
  klant: string;


  constructor(id:number , bestellingen:Bestelling[], klant:string) {
    this.id = id;
    this.bestellingen = bestellingen;
    this.klant = klant;
  }
}
