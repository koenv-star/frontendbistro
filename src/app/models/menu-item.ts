import { Categorie } from './categorie.enum';

export class MenuItem {
  constructor(
    public id: BigInteger,
    public naam: String,
    public prijs: BigInteger,
    public beschrijving: String,
    public categorie: Categorie
  ) {
    this.id = id;
    this.naam = naam;
    this.prijs = prijs;
    this.beschrijving=beschrijving;
    this.categorie=categorie;
  }
}
