import { Categorie } from './categorie.enum';

export class MenuItem {

  id: number;
  naam: string;
  prijs: number;
  beschrijving: string;
  categorie: Categorie;

  constructor(id: number, naam: string, prijs: number, beschrijving: string, categorie: Categorie) {
    this.id = id;
    this.naam = naam;
    this.prijs = prijs;
    this.beschrijving=beschrijving;
    this.categorie=categorie;
  }
}
