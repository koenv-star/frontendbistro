import { Person } from './person';
import { Zaak } from './zaak';

export class Uitbater extends Person {

  zaken: Zaak[];

  constructor(email: string, naam: string, voornaam: string, wachtwoord: string, krediet: number, zaken: Zaak[]) {
    super(email, naam, voornaam, wachtwoord, krediet);
    this.zaken = zaken;
  }
}
