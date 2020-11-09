import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bestelling } from '../models/bestelling';
import { BestellingVerzameling } from '../models/bestelling-verzameling';
import { Klant } from '../models/klant';
import { Uitbater } from '../models/uitbater';
import { AccountService } from './account.service';
import { AuthenticationService } from './authentication.service';
import { CredentialServiceService } from './credential-service.service';
import { TokenStorageService } from './token-storage.service';
import { ZaakService } from './zaak.service';


@Injectable({
  providedIn: 'root'
})
export class BestellenService {
  private BVKEY:string = "BV_KEY";
  private ZKEY:string = "Z_KEY";
  private MKEY = "M_KEY";
  private url:string = "http://localhost:8080/bestellingVerzameling";

  constructor(private http: HttpClient, private tokenService:TokenStorageService,private credentialService:CredentialServiceService,
              private service: AuthenticationService, private serviceAccount: AccountService) { }

  public getBestellingen():BestellingVerzameling {
    return JSON.parse(window.sessionStorage.getItem(this.BVKEY));
  }

  public saveBestellingen(BestellingVerzameling:BestellingVerzameling) {
    window.sessionStorage.setItem(this.BVKEY, JSON.stringify(BestellingVerzameling));
  }

  public add(bestelling:Bestelling, zaakNaam:string){
    let besVer:BestellingVerzameling = this.getBestellingen();
    let namen:string[] = this.getZaakNamen();
    if(besVer == null) {
      besVer = new BestellingVerzameling(0, new Array(), null, null);
    }
    if (namen == null) {
      namen = new Array();
    }
    let contains:boolean = false;
    for(let i = 0; i < besVer.bestellingen.length && !contains; i++) {
      let bestellingen:Bestelling[] = besVer.bestellingen;
      if(bestellingen[i].menuItem.id == bestelling.menuItem.id && bestellingen[i].zaakId == bestelling.zaakId){
        bestellingen[i].aantal++
        contains = true;
      }
    }
    if (!contains) {
      besVer.bestellingen[besVer.bestellingen.length] = bestelling;
      namen[namen.length] = zaakNaam;
    }
    this.saveBestellingen(besVer);
    this.saveZaakNamen(namen);
  }

  public getZaakNamen():string[] {
    return JSON.parse(window.sessionStorage.getItem(this.ZKEY));
  }

  public saveZaakNamen(zaakNamen:string[]) {
    window.sessionStorage.setItem(this.ZKEY,JSON.stringify(zaakNamen));
  }

  public postBestelling(total:number, message:string){
    let user = this.tokenService.getUser();
    for(let i = 0; i < 10 && user == null; i++) {
      setTimeout(() => {}, 500)
    }
    if (user !== null) {
      this.service.userChange$.next({email: user.email,role: user.role});
      this.serviceAccount.updateUser();
      let besVer:BestellingVerzameling = this.getBestellingen();
      besVer.klant = user.email;
      window.sessionStorage.removeItem(this.BVKEY);
      window.sessionStorage.removeItem(this.ZKEY);
      if (user.role == "ROLE_UITBATER") {
        this.serviceAccount.uitbater$.asObservable().subscribe(res => {
          let tempUitbater = new Uitbater(
            res.naam,
            res.voornaam,
            res.email,
            'a'.repeat(60),
            res.krediet - total,
            res.reservaties,
            res.bestellingVerzamelingen,
            res.zaken);
          this.credentialService.updateUitbater(tempUitbater.email, tempUitbater);
        });
      } else {
        this.serviceAccount.klant$.asObservable().subscribe(res => {
          let tempKlant = new Klant(
            res.email,
            res.naam,
            res.voornaam,
            'a'.repeat(60),
            res.krediet - total,
            res.reservaties,
            res.bestellingVerzamelingen);
            console.log(tempKlant);
          this.credentialService.updateKlant(tempKlant.email, tempKlant).subscribe();
        }).unsubscribe();
      }
      besVer.message = message;
      this.http.post<BestellingVerzameling>(this.url, besVer).subscribe();
    }
    this.serviceAccount.updateUser();
  }

  public saveMessage(message:string){
    window.sessionStorage.setItem(this.MKEY, message);
  }

  public getMessage():string {
    return window.sessionStorage.getItem(this.MKEY);
  }
}
