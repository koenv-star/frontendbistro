export class Advertenties {

  constructor(public id: number,
              public zaakNaam: string,
              public zaakDesc: string,
              public zaakId:number,
              public numberOfShow: number) {
    this.id = id;
    this.numberOfShow = numberOfShow;
    this.zaakDesc = zaakDesc;
    this.zaakNaam = zaakNaam;
    this.zaakId = zaakId;
  }

}
