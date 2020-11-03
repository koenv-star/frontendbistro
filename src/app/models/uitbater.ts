import { BestellingVerzameling } from './bestelling-verzameling';
import { Klant } from './klant';
import { Reservatie } from './reservatie';
import { Zaak } from './zaak';

export class Uitbater extends Klant {

  zaken: Zaak[];

  constructor(naam: string, voornaam: string, email: string, wachtwoord: string, krediet: number,
    reservaties: Reservatie[], bestellingVerzamelingen: BestellingVerzameling[], zaken: Zaak[]) {

    super(email, naam, voornaam, wachtwoord, krediet, reservaties, bestellingVerzamelingen);
    this.zaken = zaken;
  }
}
