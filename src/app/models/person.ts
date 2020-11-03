import {Reservatie} from './reservatie';

export abstract class Person {
  constructor(
    public naam: string,
    public voornaam: string,
    public email: string,
    public wachtwoord: string,
    public krediet: number,
    public reservaties: Reservatie[]
  ) {
    this.naam = naam;
    this.voornaam = voornaam;
    this.email = email;
    this.wachtwoord = wachtwoord;
    this.krediet = krediet;
    this.reservaties = reservaties;
  }
}
