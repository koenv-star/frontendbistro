import { Time } from '@angular/common';
import { Klant } from './klant';
import { Tafel } from './tafel';
import { Zaak } from './zaak';

export class Reservatie {

  id: number;
  tijdstip: Date;
  uurMarge: Time;
  totaal: number;
  klant: Klant;
  zaak: Zaak;
  tafel: Tafel;
}
