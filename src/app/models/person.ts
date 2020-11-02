import {Reservatie} from './reservatie';

export abstract class Person {
  constructor(
    public naam: String,
    public voornaam: String,
    public email: String,
    public wachtwoord: String,
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
