import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bestelling } from '../models/bestelling';
import { BestellingVerzameling } from '../models/bestelling-verzameling';
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
      besVer = new BestellingVerzameling(0, new Array(), null);
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

  public postBestelling(total:number){
    console.log("start");
    let user = this.tokenService.getUser();
    if (user !== null) {
      this.service.userChange$.next({email: user.email,role: user.role});
      this.serviceAccount.updateUser();
      let besVer:BestellingVerzameling = this.getBestellingen();
      besVer.klant = user.email;
      console.log(besVer);
      window.sessionStorage.removeItem(this.BVKEY);
      window.sessionStorage.removeItem(this.ZKEY);
      if (user.role == "ROLE_UITBATER") {
        this.serviceAccount.uitbater$.asObservable().subscribe(res => {
          res.krediet -= total;
          console.log(res)
          this.credentialService.updateKlant(res.email ,res).subscribe();
        });
      } else {
        this.serviceAccount.klant$.asObservable().subscribe(res => {
          res.krediet -= total;
          console.log(res);
          this.credentialService.updateKlant(res.email ,res).subscribe();
        });
      }
      this.http.post<BestellingVerzameling>(this.url, besVer).subscribe();
    }
    this.serviceAccount.updateUser();
  }
}
