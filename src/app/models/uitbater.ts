import { Person } from './person';
import { Zaak } from './zaak';

export class Uitbater extends Person {

  zaken: Zaak[];

  constructor(zaken: Zaak[]) {
    super();
    this.zaken = zaken;
  }
}
