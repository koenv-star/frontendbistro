import { Component, OnInit } from '@angular/core';
import { defaults as defaultControls } from 'ol/control';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import ZoomToExtent from 'ol/control/ZoomToExtent';

@Component({
  selector: 'app-zaken-klant-lijst',
  templateUrl: './zaken-klant-lijst.component.html',
  styleUrls: ['./zaken-klant-lijst.component.css']
})
export class ZakenKlantLijstComponent implements OnInit {

  currentPos: Position;
  map: Map;

  constructor() { }

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation(): void {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentPos = position;
        this.createMap();
      });
    }
  }

  createMap(): void {
    this.map = new Map({
      target: 'zaken_map',
      layers: [new TileLayer({source: new OSM()})],
      view: new View({
        center: olProj.fromLonLat([this.currentPos.coords.longitude, this.currentPos.coords.latitude]),
        zoom: 12
      }),
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: [
            813079.7791264898, 5929220.284081122,
            848966.9639063801, 5936863.986909639
          ]
        })
      ])
    });
  }
}
