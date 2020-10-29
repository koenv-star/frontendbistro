export class Owner {

    constructor(public naam: String,
                public voornaam:String,
                public email: String,
                public  wachtwoord: String,
                public kredieten: number,
                public reservaties: String[],
                public bestellingVerzammelingen: String[],
                public zaken: String[]
                ){

        this.naam = naam;
        this.voornaam = voornaam;
        this.email = email;
        this.wachtwoord = wachtwoord;
        this.kredieten = kredieten;
        this.reservaties = reservaties;
        this.bestellingVerzammelingen = reservaties;
        this.zaken = zaken;
      }


}
