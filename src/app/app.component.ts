import { Component, OnInit } from '@angular/core';
import { PlacesService } from './services/places.service';

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

  constructor(private placesService: PlacesService) {  }

  ngOnInit(): void {
    this.loadAllPlaces();
    this.loadAllZipcodes();
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

        // this.communityStartId = 11001;
        // this.communityEndId = 13053;
      });
  }

  loadAllZipcodes(): void {
    this.placesService.getZipcodes()
      .subscribe(data => {
        allZipcodes = data;
      })
  }
}
export var allCommunities: any[] = new Array();
export var allZipcodes: any[] = new Array();
