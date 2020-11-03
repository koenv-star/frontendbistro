import { BestellingVerzameling } from './bestelling-verzameling';
import { Reservatie } from './reservatie';

export class Klant {

  email: string;
  naam: string;
  voornaam: string;
  wachtwoord: string;
  krediet: number;
  reservaties: Reservatie[];
  bestellingVerzamelingen: BestellingVerzameling[];

  constructor(email: string, naam: string, voornaam: string, wachtwoord: string, krediet: number,
    reservaties: Reservatie[], bestellingVerzamelingen: BestellingVerzameling[]) {

      this.email = email;
      this.naam = naam;
      this.voornaam = voornaam;
      this.wachtwoord = wachtwoord;
      this.krediet = krediet;
      this.reservaties = reservaties;
      this.bestellingVerzamelingen = bestellingVerzamelingen;
  }
}
