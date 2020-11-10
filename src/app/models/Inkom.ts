export class Inkom{

  constructor(public zaakId:number, public zaakNaam:string, public totalEarning:number) {
    this.zaakId = zaakId;
    this.zaakNaam = zaakNaam;
    this.totalEarning = totalEarning;
  }
}
