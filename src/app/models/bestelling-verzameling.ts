import { Bestelling } from './bestelling';
import { Klant } from './klant';

export class BestellingVerzameling {

  id: number;
  bestellingen: Bestelling[];
  klant: string;
  message: string;


  constructor(id:number , bestellingen:Bestelling[], klant:string, message:string) {
    this.id = id;
    this.bestellingen = bestellingen;
    this.klant = klant;
    this.message = message;
  }
}
