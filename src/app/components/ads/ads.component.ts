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
  //fiels for form
  zaakId: number;
  formule: string;
  description: string;
  numberOfShow: number;
  krediet: number;
  //een zaak van zaken
  zaak: Zaak;
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
      this.zaakId = this.bestelAd.value.zaak;
      this.formule = this.bestelAd.value.formule;
      this.description = this.bestelAd.value.text;
      this.krediet = this.uitbater.krediet - Number.parseInt(this.formule);
      this.zaak = this.zaken.find(x => x.id == this.zaakId);
      if (this.formule == '20') {
        this.numberOfShow = 200;
      }
      if (this.formule == '50') {
        this.numberOfShow = 1000;
      }
      if (this.formule == '100') {
        this.numberOfShow = 3000;
      }

      this.advertentie = new Advertenties(
        0,
        this.zaak.naam,
        this.description,
        this.zaak.id,
        this.numberOfShow);

      this.saveAdvertentie();
      this.updateKrediet();

      this.router.navigateByUrl("").finally(()=> alert("Mooi, uw aankoop is geslaagd"));

    } else {
      alert('Uw krediet is niet voldoende! ');
    }


  }

  updateKrediet() {
    console.log(this.krediet)

    let tempUitbater = new Uitbater(
      this.uitbater.naam,
      this.uitbater.voornaam,
      this.uitbater.email,
      'a'.repeat(60),
      this.krediet,
      this.uitbater.reservaties,
      this.uitbater.bestellingVerzamelingen,
      this.uitbater.zaken);
    this.serviceCredentials.updateUitbater(this.uitbater.email, tempUitbater).subscribe(data => {
      console.log(data);
    });

  }

  saveAdvertentie() {
    let tempAdvertentie = new Advertenties(
      0,this.zaak.naam,this.description,this.zaakId.valueOf(),this.numberOfShow
    );
    this.serviceAdd.saveAdvertentie(tempAdvertentie).subscribe(data => {
      console.log(data);
    });
  }

}
