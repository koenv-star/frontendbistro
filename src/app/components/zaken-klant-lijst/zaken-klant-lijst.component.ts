import { Component, OnInit } from '@angular/core';
import { Circle, Fill, Icon, Style } from 'ol/style.js';
import { fromLonLat } from 'ol/proj';
import { fromUserCoordinate } from 'ol/proj';
import { toLonLat } from 'ol/proj';
import { toUserCoordinate } from 'ol/proj';
import { transform } from 'ol/proj';

import Map from 'ol/Map';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import Feature  from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector';
import BaseLayer from 'ol/layer/Base';
import { Zaak } from 'src/app/models/zaak';
import { ZaakService } from 'src/app/services/zaak.service';
import { PlacesService } from 'src/app/services/places.service';

/**
 * Gemaakt door Jan
 */
@Component({
  selector: 'app-zaken-klant-lijst',
  templateUrl: './zaken-klant-lijst.component.html',
  styleUrls: ['./zaken-klant-lijst.component.css']
})
export class ZakenKlantLijstComponent implements OnInit {

  currentPos: Position;
  map: Map;
  currentPosMarker: Feature;
  vectorLayer: BaseLayer;
  vectorSource: VectorSource;
  zaken: Zaak[];

  constructor(private zaakService: ZaakService,
              private placesService: PlacesService) { }

  ngOnInit(): void {
    this.vectorSource = new VectorSource({ features: [] });
    this.vectorLayer = new VectorLayer({ source: this.vectorSource });
    this.getLocation();
    this.getRestaurants();
  }

  getLocation(): void {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentPos = position;
        this.addMarker(this.currentPos.coords.longitude, this.currentPos.coords.latitude, 'house');
        this.createMap();
      });
    }
  }

  createMap(): void {

    this.map = new Map({
      target: 'zaken_map',
      layers: [
        new Tile({source: new OSM()}),
        new VectorLayer({
          source: this.vectorSource,
          style: new Style({
            image: new Circle({
              radius: 2,
              fill: new Fill({ color: 'red' })
            }),
        })
        })],
      view: new View({
        center: fromLonLat([this.currentPos.coords.longitude, this.currentPos.coords.latitude]),
        zoom: 13
      }),
      controls: []
    });
  }

  getRestaurants(): void {
    this.zaakService.getAllZaken()
      .subscribe(data => {
        this.zaken = data;
        this.putRestaurantsOnMap();
      })
  }

  putRestaurantsOnMap(): void {
    this.zaken.forEach(zaak => {
      this.placesService.getCoordinatesFromAddress(zaak.adres)
        .subscribe(data => {
          this.addMarker(data.bbox[2], data.bbox[3], 'shop');
        })
    })
  }

  addMarker(coordX: number, coordY: number, img: string): void {

    let marker = new Feature({
      geometry: new Point(fromLonLat([coordX, coordY]))
    });

    marker.setStyle(new Style({
      image: new Icon(({
        crossOrigin: 'anonymous',
        src: `assets/bootstrap-icons/${img}.svg`,
        imgSize: [20, 20]
      }))
    }));

    this.vectorSource.addFeature(marker);
  }
}
