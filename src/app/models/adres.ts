export class Adres {

  id: number;
  straat: string;
  huisNr: string;
  postcode: number;
  gemeente: string;

  constructor(id: number, straat: string, huisNr: string, postcode: number, gemeente: string) {
    this.id = id;
    this.straat = straat;
    this.huisNr = huisNr;
    this.postcode = postcode;
    this.gemeente = gemeente;
  };
}
