import { Time } from '@angular/common';
import { Stringtool } from '../tools/stringtool';
import { Klant } from './klant';
import { Reservatie } from './reservatie';
import { Tafel } from './tafel';
import { Zaak } from './zaak';

export class Reservatieresponse {
  id: number;
  tijdstip: Date;
  uurMarge: String;
  totaal: number;
  klant: String;
  zaak: Number;
  tafel: Tafel;

  constructor(res: Reservatie) {
    this.id = res.id;
    this.tijdstip = res.tijdstip;
    this.uurMarge = Stringtool.TimetoTimeString(res.uurMarge);
    this.totaal = res.totaal;
    this.klant = res.klant;
    this.zaak = res.zaak;
    this.tafel = res.tafel;
  }
}
