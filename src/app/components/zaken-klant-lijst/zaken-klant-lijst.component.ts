import { Component, OnInit } from '@angular/core';

import Map from 'ol/Map';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import Feature  from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style.js';
import VectorSource from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector';
import BaseLayer from 'ol/layer/Base';

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

  constructor() { }

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation(): void {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentPos = position;
        this.addCurrentPosMarker();
        this.createMap();
      });
    }
  }

  addCurrentPosMarker(): void {
    this.currentPosMarker = new Feature({
      geometry: new Point(fromLonLat([this.currentPos.coords.longitude, this.currentPos.coords.latitude]))
    });

    this.currentPosMarker.setStyle(new Style({
      image: new Icon(({
        color: '#8959A8',
        crossOrigin: 'anonymous',
        src: 'assets/bootstrap-icons/house.svg',
        imgSize: [20, 20]
      }))
    }));
  }

  createMap(): void {

    this.vectorSource = new VectorSource({
      features: [this.currentPosMarker]
    });

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource
    });

    this.map = new Map({
      target: 'zaken_map',
      layers: [new Tile({source: new OSM()}), this.vectorLayer],
      view: new View({
        center: fromLonLat([this.currentPos.coords.longitude, this.currentPos.coords.latitude]),
        zoom: 13
      }),
      controls: []
    });
  }
}
