import { Person } from './person';
import { Reservatie } from './reservatie';
import { Zaak } from './zaak';

export class Uitbater extends Person {

  zaken: Zaak[];

  constructor(naam: string, voornaam: string, email: string, wachtwoord: string, krediet: number, reservaties: Reservatie[], zaken: Zaak[]) {
    super(naam, voornaam, email, wachtwoord, krediet, reservaties);
    this.zaken = zaken;
  }
}
