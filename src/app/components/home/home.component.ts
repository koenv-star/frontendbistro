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
  ads: Advertenties[];
  range: number;
  adsNo: number;
  adZaak: Zaak;
  adImg: string;

  constructor(private serviceAdvertentie: AdvertentiesService,
              private serviceZaak: ZaakService,
              private router: Router) {
  }

  ngOnInit(): void {
    //getting list of ads
    this.getAdvertenties();
    //randomly selecting one and showing in the landing page


  }

  private getAdvertenties() {
    this.serviceAdvertentie.getAllAdvertenties().subscribe(data => {
      if (!isNull(data)) {
        this.ads = data;
        this.range = this.ads.length;
        console.log(data);
        this.showAdvertentie();
      }
    });
  }

  private showAdvertentie() {

    //Getting random ads number according the ads list
    this.adsNo = Math.floor((Math.random() * this.range));
    console.log(this.adsNo);
    //getting the zaak Informations from Data base


    if (this.ads.length > 0) {
      console.log('id of the advertesi: ' + this.ads[this.adsNo].id);
      this.getZaak(this.ads[this.adsNo].id);


      //beacuse it will shown, we need to update the number of showing
      if (this.ads[this.adsNo].numberOfShow != 0 || this.ads[this.adsNo].numberOfShow ! < 0) {
        console.log(this.ads[this.adsNo].numberOfShow);
        console.log(this.ads[this.adsNo].numberOfShow = this.ads[this.adsNo].numberOfShow - 1);

        //help with the service of Advertisement we also updating our database
        this.serviceAdvertentie.updateAdvertentie(
          this.ads[this.adsNo].id,
          this.ads[this.adsNo]).subscribe(data => {
          console.log(data);
        });
      } else {
        // need to delete this add because the showing number is 0
        // Delete method call and push the id to delete from database
        this.serviceAdvertentie.deleteAdvertentei(this.ads[this.adsNo].id).subscribe(data => {
          console.log(data);
        });
      }

    } else {
      this.adImg = '/assets/images/restaurants/ads.svg';
    }
  }

  private getZaak(adsNo: number) {
    this.serviceZaak.getZaak(adsNo).subscribe(data => {
      this.adZaak = data;
      console.log(this.adZaak);
      let str = this.adZaak.imageURL;
      //getting url and replacing backslashes to forward and checks if there is duplicate remove them
      this.adImg = str
        .replace(/\\/g, '/')
        .replace(/([^:]\/)\/+/g, '$1');
    });
  }
}
