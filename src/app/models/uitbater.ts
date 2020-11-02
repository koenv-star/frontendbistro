import { Person } from './person';
import { Reservatie } from './reservatie';
import { Zaak } from './zaak';

export class Uitbater extends Person {

  zaken: Zaak[];

  constructor(naam: string, voornaam: string, email: string, wachtwoord: string, krediet: number, role: string, reservaties: Reservatie[], zaken: Zaak[]) {
    super(naam, voornaam, email, wachtwoord, krediet, role, reservaties);
    this.zaken = zaken;
  }
}
