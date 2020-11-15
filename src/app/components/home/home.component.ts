import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AdvertentiesService} from '../../services/advertenties.service';
import {Router} from '@angular/router';
import {Advertenties} from '../../models/advertenties';
import {Zaak} from '../../models/zaak';
import {ZaakService} from '../../services/zaak.service';
import {isNull} from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  range: number;
  adsNo: number;
  adZaak: Zaak;
  adImg: string;
  ad: Advertenties;
  isAd: boolean = false;

  constructor(private serviceAdvertentie: AdvertentiesService,
              private serviceZaak: ZaakService,
              private router: Router) {
  }

  ngOnInit(): void {
    //getting length of ads
    this.getAdvertentiesLength();
  }

  private getAdvertentiesLength() {

    this.serviceAdvertentie.getAdvertentiesLength().subscribe(data => {
      if (!isNull(data)) {
        this.range = data;

        console.log("callback: ", data);
        console.log('ads length: ', this.range);

        this.isAd = true;
        this.showAdvertentie();
      }else{
        this.adImg ='ads.svg';
        this.isAd = false
      }
    });
  }

  private showAdvertentie() {

    //Getting random ads number according the ads list
    this.adsNo = Math.ceil((Math.random() * this.range));
    console.log("random adsNR",this.adsNo);
    //getting the zaak Informations from Data base



    if (this.range != 0) {
      this.isAd =true;
      this.getZaakEnAdvertentie(this.adsNo);


    } else {
      this.adImg = 'ads.svg';
      this.isAd = false;
    }
  }

  private getZaakEnAdvertentie(adNo: number) {
    this.serviceAdvertentie.getZaakByAdvertentieId(adNo).subscribe(data => {
      this.adZaak = data;
      console.log(this.adZaak);
      let str = this.adZaak.imageURL;
      //getting url and replacing backslashes to forward and checks if there is duplicate remove them
      this.adImg = str;
    });
    this.serviceAdvertentie.getAdvertentieById(adNo).subscribe(data => {
      this.ad = data;
    });
  }
}
