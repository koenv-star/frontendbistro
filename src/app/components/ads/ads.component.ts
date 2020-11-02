import {Component, OnInit} from '@angular/core';
import {CredentialServiceService} from '../../services/credential-service.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/token-storage.service';
import {AuthenticationService} from '../../services/authentication.service';
import {AccountService} from '../../services/account.service';
import {Uitbater} from '../../models/uitbater';
import {isNull} from 'util';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ZaakService} from '../../services/zaak.service';
import {Zaak} from '../../models/zaak';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

  //uitbater object
  uitbater: Uitbater;
  //zaken van uitbater
  zaken:Zaak[];

  bestelAd: FormGroup;


  constructor(private serviceCredentials: CredentialServiceService,
              private router: Router,
              private serviceToken: TokenStorageService,
              private serviceAuth: AuthenticationService,
              private serviceAccount: AccountService,
              private formBuilder: FormBuilder,
              private serviceZaak: ZaakService,
              ) {
  }

  ngOnInit(): void {
    this.getUser();
   //To build the form
    this.formBuild();


  }
//getting user detail according the session.
  private getUser() {
    let user = this.serviceToken.getUser();
    if (!isNull(user)) {
      this.serviceAuth.userChange$.next({email: user.email, role: user.role});
      this.serviceAccount.updateUser();
      this.serviceAccount.uitbater$.asObservable().subscribe(data => {
        this.uitbater = data;
      });
    }
    this.getZakenBijUitbater(user);
  }
  private formBuild(){
    this.bestelAd = this.formBuilder.group({
      formule: ['', Validators.required],
      zaak: ['', Validators.required],
    });
  }


  private getZakenBijUitbater(user) {
    this.serviceZaak.getZakenBijUitbaterEmail(user.email).subscribe(data => {
      this.zaken = data;
    })

  }
  //  showing the section of the ordering options and restaurants
  bestelNu(){
    let view = document.querySelector(".firstView") as HTMLElement;
    let view2 = document.querySelector(".secondView") as HTMLElement;
    view.style.display = "none";
    view.style.animation ="leftSlider 2s ease forwards";
    view.style.transition ="2s";
    view.classList.add("leftSlider");
    view2.style.animation = "rightSlider 2s ease forwards";
    view2.style.display = "block";
    view2.classList.add("rightSlider")
  }
//canceling the ordering process
  cancel() {
    let view = document.querySelector(".firstView") as HTMLElement;
    let view2 = document.querySelector(".secondView") as HTMLElement;
    view.style.display = "block";
    view.style.animation ="rightSlider 2s ease forwards";
    view.classList.add("rightSlider");
    view2.style.animation = "leftSlider 2s ease forwards";
    view2.style.display = "none";
    view2.classList.add("leftSlider")
  }

  koopNu() {
    // to-do buying process with credit
  }
}
