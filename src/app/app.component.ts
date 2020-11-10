import { Component, OnInit } from '@angular/core';
import { Zaak } from './models/zaak';
import { PlacesService } from './services/places.service';
import { TokenStorageService } from './services/token-storage.service';
import { ZaakService } from './services/zaak.service';

/**
 * Gemaakt door Jan
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'jammik';
  user: any;

  static zakenBijUitbater: Zaak[];

  constructor(private placesService: PlacesService,
              private zaakService: ZaakService,
              private tokenService: TokenStorageService) {  }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    this.loadAllPlaces();
  }

  loadAllPlaces(): void {
    this.placesService.getPlaces()
      .subscribe(data => {
        data.gemeenten.filter(g => {
          let id = g.detail.substring(54,);
          id = Number.parseInt(id);
          return (id >= 11001 && id <= 13053) || (id >= 23002 && id <= 24137) || (id >= 31003 && id <= 38025)
            || (id >= 41002 && id <= 46025) || (id >= 71002 && id <= 72042);
        }).sort((a, b) => {
          let aNaam: string = a.gemeentenaam.geografischeNaam.spelling;
          let bNaam: string = b.gemeentenaam.geografischeNaam.spelling;

          if(aNaam < bNaam) return -1;
          else if(aNaam > bNaam) return 1;
          return 0;
        }).forEach(g => {
          let id = g.detail.substring(54,);
          id = Number.parseInt(id);
          allCommunities.push({ id: id, name: g.gemeentenaam.geografischeNaam.spelling });
        });
      });
  }
}
export var allCommunities: any[] = new Array();
