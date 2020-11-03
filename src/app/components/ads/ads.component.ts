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
import {Advertenties} from '../../models/advertenties';
import {AdvertentiesService} from '../../services/advertenties.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

  //uitbater object
  uitbater: Uitbater;
  //zaken van uitbater
  zaken: Zaak[];
  //Advertentie object
  advertentie: Advertenties;

  bestelAd: FormGroup;


  constructor(private serviceCredentials: CredentialServiceService,
              private router: Router,
              private serviceToken: TokenStorageService,
              private serviceAuth: AuthenticationService,
              private serviceAccount: AccountService,
              private formBuilder: FormBuilder,
              private serviceZaak: ZaakService,
              private serviceAdd: AdvertentiesService
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

  private formBuild() {
    this.bestelAd = this.formBuilder.group({
      formule: ['', Validators.required],
      zaak: ['', Validators.required],
      text: ['', Validators.required]
    });
  }


  private getZakenBijUitbater(user) {
    this.serviceZaak.getZakenBijUitbaterEmail(user.email).subscribe(data => {
      if (isNull(data)) {
        this.zaken = new Array();
      } else {
        this.zaken = data;
      }
    });

  }

  //  showing the section of the ordering options and restaurants
  bestelNu() {
    let view = document.querySelector('.firstView') as HTMLElement;
    let view2 = document.querySelector('.secondView') as HTMLElement;
    view.style.display = 'none';
    view.style.animation = 'leftSlider 2s ease forwards';
    view.style.transition = '2s';
    view.classList.add('leftSlider');
    view2.style.animation = 'rightSlider 2s ease forwards';
    view2.style.display = 'block';
    view2.classList.add('rightSlider');
  }

//canceling the ordering process
  cancel() {
    let view = document.querySelector('.firstView') as HTMLElement;
    let view2 = document.querySelector('.secondView') as HTMLElement;
    view.style.display = 'block';
    view.style.animation = 'rightSlider 2s ease forwards';
    view.classList.add('rightSlider');
    view2.style.animation = 'leftSlider 2s ease forwards';
    view2.style.display = 'none';
    view2.classList.add('leftSlider');
  }

  koopNu() {
    // to-do buying process with credit
    // get the credit of the user and check the amount is it enough or not ?
    // if it is enough than make the substruction from credit and call the method
    // to  update user kredit information for the uitbater
    // also add the advertisement into advertisement table
    // create in landing page to get all ads from the advertisement table.

    if (this.uitbater.krediet >= Number.parseInt(this.bestelAd.value.formule)) {
      let zaakNaam: string = this.bestelAd.value.zaak;
      let formule: string = this.bestelAd.value.formule;
      let zaak = this.zaken.find(x => x.naam === zaakNaam);
      let description: string = this.bestelAd.value.text;
      let numberOfShow: number;
      if (formule == '20') {
        numberOfShow = 200;
      }
      if (formule == '50') {
        numberOfShow = 1000;
      }
      if (formule == '100') {
        numberOfShow = 3000;

      }
      console.log(this.uitbater.krediet);
      let krediet = this.uitbater.krediet - Number.parseInt(formule);
      console.log(krediet);

      let tempUitbater = new Uitbater(this.uitbater.naam,
        this.uitbater.voornaam,
        this.uitbater.email,
        "a".repeat(60),
        krediet,
        this.uitbater.reservaties);
      tempUitbater.zaken = this.uitbater.zaken;
      tempUitbater.bestellingVerzamelingen = this.uitbater.bestellingVerzamelingen;
      this.serviceCredentials.updateUitbater(this.uitbater.email, tempUitbater).subscribe(data => {
        console.log(data);
      });


      this.advertentie = new Advertenties(0, zaak.naam, description, numberOfShow);
      this.serviceAdd.saveAdvertentie(this.advertentie).subscribe(data => {
        console.log(data);
      });

    } else {

      alert('Uw krediet niet genoug, reload AUB! ');
    }
  }
}
