import { Injectable } from '@angular/core';
import { Bestelling } from '../models/bestelling';
import { BestellingVerzameling } from '../models/bestelling-verzameling';


@Injectable({
  providedIn: 'root'
})
export class BestellenService {
  private BVKEY:string = "BV_KEY";
  private ZKEY:string = "Z_KEY";

  constructor() { }

  public getBestellingen():BestellingVerzameling {
    return JSON.parse(window.sessionStorage.getItem(this.BVKEY));
  }

  public saveBestellingen(BestellingVerzameling:BestellingVerzameling) {
    window.sessionStorage.setItem(this.BVKEY, JSON.stringify(BestellingVerzameling));
  }

  public add(bestelling:Bestelling, zaakNaam:string){
    let besVer:BestellingVerzameling = this.getBestellingen();
    let namen:string[] = this.getZaakNamen();
    besVer.bestellingen[besVer.bestellingen.length] = bestelling;
    namen[namen.length] = zaakNaam;
    this.saveBestellingen(besVer);
    this.saveZaakNamen(namen);
  }

  public getZaakNamen():string[] {
    return JSON.parse(window.sessionStorage.getItem(this.ZKEY));
  }

  public saveZaakNamen(zaakNamen:string[]) {
    window.sessionStorage.setItem(this.ZKEY,JSON.stringify(zaakNamen));
  }

}
