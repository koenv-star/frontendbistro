import { Time } from '@angular/common';

export class Dag {

  naam: string;
  openingsUur: Time;
  sluitingsUur: Time;

  constructor(naam: string, openingsUur: Time, sluitingsuur: Time) {
    this.naam = naam;
    this.openingsUur = openingsUur;
    this.sluitingsUur = sluitingsuur;
  }
}
