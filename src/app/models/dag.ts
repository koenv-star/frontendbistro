import { Time } from '@angular/common';

export class Dag {

  naam: string;
  openingsUur: Time;
  sluitingsUur: Time;

  public isGesloten():boolean {
    return this.openingsUur == null && this.sluitingsUur == null;
  }
}
