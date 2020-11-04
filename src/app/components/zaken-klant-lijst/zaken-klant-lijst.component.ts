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
import { source } from 'openlayers';
import { Overlay } from 'ol';

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
        this.addMarker(null, this.currentPos.coords.longitude, this.currentPos.coords.latitude, 'house');
        this.createMap();
        this.showPopupOnMarkerClick();
      });
    }
  }

  createMap(): void {

    this.map = new Map({
      target: 'zaken_map',
      layers: [
        new Tile({source: new OSM(), opacity: 1}),
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
          this.addMarker(zaak, data.bbox[2], data.bbox[3], 'shop');
        })
    })
  }

  addMarker(zaak: Zaak, coordX: number, coordY: number, img: string): void {

    let marker = new Feature({
      name: zaak != null ? zaak.naam : 'U bent hier',
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

  showPopupOnMarkerClick(): any {

    const overlayContainerElement = document.querySelector('.overlay-container') as HTMLElement;
    const overlayFeatureName = document.querySelector('#feature-name');
    const overlayLayer = new Overlay({ element: overlayContainerElement });
    this.map.addOverlay(overlayLayer);

    this.map.on('click', (event) => {

      overlayLayer.setPosition(undefined);

      this.map.forEachFeatureAtPixel(event.pixel, (feature: any, layer) => {
        let clickedCoordinates = event.coordinate;
        let clickedFeatureName: string = feature.get('name');
        overlayLayer.setPosition(clickedCoordinates);
        overlayFeatureName.innerHTML = clickedFeatureName;
      })
    })
  }
}
