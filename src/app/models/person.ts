export abstract class Person {

  email: string;
  naam: string;
  voornaam: string;
  wachtwoord: string;
  krediet: number;

  constructor(email: string, naam: string, voornaam: string, wachtwoord: string, krediet: number) {
    this.email = email;
    this.naam = naam;
    this.voornaam = voornaam;
    this.wachtwoord = wachtwoord;
    this.krediet = krediet;
  }
}
