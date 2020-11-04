import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bestelling } from '../models/bestelling';
import { BestellingVerzameling } from '../models/bestelling-verzameling';
import { Klant } from '../models/klant';
import { AccountService } from './account.service';
import { AuthenticationService } from './authentication.service';
import { TokenStorageService } from './token-storage.service';
import { ZaakService } from './zaak.service';


@Injectable({
  providedIn: 'root'
})
export class BestellenService {
  private BVKEY:string = "BV_KEY";
  private ZKEY:string = "Z_KEY";
  private url:string = "http://localhost:8080/bestellingVerzameling";

  constructor(private zakenService:ZaakService, private http: HttpClient, private tokenService:TokenStorageService,
              private service: AuthenticationService, private serviceAccount: AccountService,) { }

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
    if (bestelling.zaakId == 0) {
      this.zakenService.getzaakByNaam(zaakNaam).subscribe(res => {bestelling.zaakId = res.id});
    }
    besVer.bestellingen[besVer.bestellingen.length] = bestelling;
    namen[namen.length] = zaakNaam;
    this.saveBestellingen(besVer);
    this.saveZaakNamen(namen);
  }

  public getZaakNamen():string[] {
    return JSON.parse(window.sessionStorage.getItem(this.ZKEY));
  }

  public saveZaakNamen(zaakNamen:string[]) {
    window.sessionStorage.setItem(this.ZKEY,JSON.stringify(zaakNamen));
  }

  public postBestelling(){
    let user = this.tokenService.getUser();
    if (user !== null) {
      this.service.userChange$.next({email: user.email,role: user.role});
      this.serviceAccount.updateUser();
      let besVer:BestellingVerzameling = this.getBestellingen();
    if (user.role == "ROLE_UITBATER") {
      this.serviceAccount.uitbater$.asObservable().subscribe(res => besVer.klant = res).unsubscribe();
    } else {
      this.serviceAccount.klant$.asObservable().subscribe(res => besVer.klant = res).unsubscribe();
    }
    //window.sessionStorage.removeItem(this.BVKEY);
    //window.sessionStorage.removeItem(this.ZKEY);
    console.log(besVer);
    this.http.post<BestellingVerzameling>(this.url, besVer).subscribe();
    alert("Succes");
    }
  }
}
