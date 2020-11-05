import { Component, OnInit } from '@angular/core';
import { Circle, Fill, Icon, Style } from 'ol/style.js';
import { fromLonLat } from 'ol/proj';

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
import { Overlay } from 'ol';
import { Adres } from 'src/app/models/adres';

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
  currentAddress: Adres;
  map: Map;
  currentPosMarker: Feature;
  vectorLayer: BaseLayer;
  vectorSource: VectorSource;
  zaken: Zaak[];

  // popup
  overlayContainerElement: HTMLElement;
  overlayFeatureName: HTMLElement;
  overlayFeatureParking: HTMLElement;
  overlayFeatureAddress: HTMLElement;
  overlayFeatureImg: HTMLElement;
  overlayFeatureLink: HTMLElement;

  constructor(private zaakService: ZaakService,
              private placesService: PlacesService) { }

  ngOnInit(): void {
    this.vectorSource = new VectorSource({ features: [] });
    this.vectorLayer = new VectorLayer({ source: this.vectorSource });
    this.getLocation();
    this.getRestaurants();

    // popup
    this.overlayContainerElement = document.querySelector('.overlay-container') as HTMLElement;
    this.overlayFeatureName = document.querySelector('#feature-name') as HTMLElement;
    this.overlayFeatureParking = document.querySelector('#feature-parking');
    this.overlayFeatureAddress = document.querySelector('#feature-address') as HTMLElement;
    this.overlayFeatureImg = document.querySelector('#feature-image') as HTMLElement;
    this.overlayFeatureLink = document.querySelector('#feature-link') as HTMLElement;
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
        // this.putRestaurantsOnMap();
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
      parking: zaak != null ? zaak.parking : null,
      address: zaak != null ? zaak.adres : null,
      imageUrl: zaak != null ? zaak.imageURL : null,
      zaakId: zaak != null ? zaak.id : null,
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

    const overlayLayer = new Overlay({ element: this.overlayContainerElement });
    this.map.addOverlay(overlayLayer);

    this.map.on('click', (event) => {

      overlayLayer.setPosition(undefined);

      this.map.forEachFeatureAtPixel(event.pixel, (feature: any, layer) => {

        let coordinates = event.coordinate;
        let featureName: string = feature.get('name');
        let featureParking: string = feature.get('parking');
        let featureAddress: Adres = feature.get('address');
        let featureImageUrl: string = feature.get('imageUrl');
        let featureId: string = feature.get('zaakId');
        overlayLayer.setPosition(coordinates);
        this.overlayFeatureName.innerText = featureName;

        if(featureName === 'U bent hier') {
          this.changeDisplayHtmlElements('none', this.overlayFeatureParking, this.overlayFeatureAddress, this.overlayFeatureImg,
            this.overlayFeatureLink);
        }
        else {
          this.changeDisplayHtmlElements('block', this.overlayFeatureParking, this.overlayFeatureAddress, this.overlayFeatureImg,
          this.overlayFeatureLink);
          this.changeInnerTextHtmlElement(this.overlayFeatureParking, featureParking ? 'Parking: Ja' : 'Parking: Neen');
          this.changeInnerTextHtmlElement(this.overlayFeatureAddress, `${featureAddress.straat} ${featureAddress.huisNr},
          ${featureAddress.postcode} ${featureAddress.gemeente}`);
          this.changeInnerTextHtmlElement(this.overlayFeatureLink, `Naar ${featureName}`);

          this.changeAttributeHtmlElement(this.overlayFeatureImg, 'src', `./assets/images/restaurants/${featureImageUrl}`);
          this.changeAttributeHtmlElement(this.overlayFeatureLink, 'href',  `zaken/${featureId}`);
        }
      })
    })
  }

  changeDisplayHtmlElements(value: string, ...elements: HTMLElement[]) {
    elements.forEach(el => el.style.display = value);
  }

  changeInnerTextHtmlElement(el: HTMLElement, value: string) {
    el.innerText = value;
  }

  changeAttributeHtmlElement(el: HTMLElement, attr: string, value: string) {
    el.setAttribute(attr, value);
  }
}
