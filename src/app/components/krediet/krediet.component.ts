import { Component, OnInit } from '@angular/core';
import {CredentialServiceService} from '../../services/credential-service.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/token-storage.service';
import {AccountService} from '../../services/account.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ZaakService} from '../../services/zaak.service';
import {AdvertentiesService} from '../../services/advertenties.service';
import {isNull} from "util";
import {AuthenticationService} from '../../services/authentication.service';
import {Klant} from '../../models/klant';
import {Uitbater} from '../../models/uitbater';

@Component({
  selector: 'app-krediet',
  templateUrl: './krediet.component.html',
  styleUrls: ['./krediet.component.css']
})
export class KredietComponent implements OnInit {

  amount: FormGroup;
  krediet:number;
  uitbater: Uitbater;
  klant: Klant;
  constructor(private serviceCredentials: CredentialServiceService,
              private router: Router,
              private serviceToken: TokenStorageService,
              private serviceAccount: AccountService,
              private serviceAuth: AuthenticationService,
              private formBuilder: FormBuilder,
              private serviceZaak: ZaakService,
              private serviceAdd: AdvertentiesService) { }

  ngOnInit(): void {
    this.getUser();
    this.amount = this.formBuilder.group({
      amount: ['', Validators.required],
    });

  }
  getUser(){
    let user = this.serviceToken.getUser();
    if (!isNull(user)) {
      this.serviceAuth.userChange$.next({email: user.email, role: user.role});
      this.serviceAccount.updateUser();
      this.serviceAccount.uitbater$.asObservable().subscribe(data => {
        this.uitbater = data;
      });

      this.serviceAccount.klant$.asObservable().subscribe(data => {
        this.klant = data;
      });
    }
  }
  reload(){
    this.krediet = this.amount.value.amount;


    let user = this.serviceToken.getUser()
    if(user.role == "ROLE_KLANT"){
      this.krediet += this.klant.krediet;
      let tempKlant = new Klant(
        this.klant.email,
        this.klant.naam,
        this.klant.voornaam,
        'a'.repeat(60),
        this.krediet,
        this.klant.reservaties,
        this.klant.bestellingVerzamelingen);
      this.serviceCredentials.updateKlant(user.email,tempKlant).subscribe();
      this.router.navigateByUrl("").finally(()=> alert("Mooi, uw top-up is perfect gedaan!"));
    }else{
      this.krediet += this.uitbater.krediet;
      let tempUitbater = new Uitbater(
        this.uitbater.naam,
        this.uitbater.voornaam,
        this.uitbater.email,
        'a'.repeat(60),
        this.krediet,
        this.uitbater.reservaties,
        this.uitbater.bestellingVerzamelingen,
        this.uitbater.zaken);
      this.serviceCredentials.updateUitbater(user.email, tempUitbater).subscribe();
      this.router.navigateByUrl("").finally(()=>{
        alert("Mooi, uw top-up is perfect gedaan!");
        location.reload();
      }
      );

    }

  }

}
