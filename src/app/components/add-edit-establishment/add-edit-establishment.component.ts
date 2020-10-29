import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlacesService } from 'src/app/services/places.service';
import { JammikValidators } from 'src/app/validators/jammik-validators';
import { allCommunities } from 'src/app/app.component';

/**
 * Gemaakt door Jan
 */
@Component({
  selector: 'app-add-edit-establishment',
  templateUrl: './add-edit-establishment.component.html',
  styleUrls: ['./add-edit-establishment.component.css']
})
export class AddEditEstablishmentComponent implements OnInit {

  addEstablishmentFormGroup: FormGroup;

  // address
  allCommunities = allCommunities;
  communityStartId: number = 11001;
  communityEndId: number = 13053;
  streets: string[];
  busNumbers: string[];

  // opening hours
  clocks: any[];

  constructor(private formBuilder: FormBuilder,
    private placesService: PlacesService) { }

  ngOnInit(): void {
    this.buildForm();

    // address
    this.streets = new Array();
    this.setStreets();
    this.busNumbers = new Array();
    this.setBusNumbers();

    // opening hours
    this.clocks = Array.from(document.querySelectorAll('input[type=time]'));
  }

  // build the form for adding an establishment
  buildForm(): void {
    this.addEstablishmentFormGroup = this.formBuilder.group({

      establishment: this.formBuilder.group({
        establishmentName: new FormControl('', [Validators.required, Validators.minLength(2), JammikValidators.notOnlyWhitespace]),
        parking: new FormControl()
      }),

      address: this.formBuilder.group({
        province: new FormControl('Antwerpen', [Validators.required]),
        community: new FormControl('Aartselaar', [Validators.required]),
        zipcode: new FormControl(2630, [Validators.required, Validators.pattern(new RegExp(/^\\d{4}$/))]),
        street: new FormControl('Acacialaan', [Validators.required, Validators.pattern(new RegExp(/^(?:(?!_).)*$/)), Validators.minLength(2), JammikValidators.notOnlyWhitespace]),
        bus: new FormControl('1', [Validators.required, JammikValidators.notOnlyWhitespace,
          JammikValidators.cannotBeGeen])
      }),

      openingHours: this.formBuilder.group({
        openingsuurMa: new FormControl('00:00'),
        sluitingsuurMa: new FormControl('00:00'),
        openingsuurDi: new FormControl('00:00'),
        sluitingsuurDi: new FormControl('00:00'),
        openingsuurWo: new FormControl('00:00'),
        sluitingsuurWo: new FormControl('00:00'),
        openingsuurDo: new FormControl('00:00'),
        sluitingsuurDo: new FormControl('00:00'),
        openingsuurVr: new FormControl('00:00'),
        sluitingsuurVr: new FormControl('00:00'),
        openingsuurZa: new FormControl('00:00'),
        sluitingsuurZa: new FormControl('00:00'),
        openingsuurZo: new FormControl('00:00'),
        sluitingsuurZo: new FormControl('00:00')
      }),

      image: this.formBuilder.group({
        image: new FormControl(null, [Validators.required, JammikValidators.mustBePngJpgOrJpeg])
      })
    });
  }

  // get the fields of the form
  get establishmentName() { return this.addEstablishmentFormGroup.get('establishment.establishmentName'); }
  get parking() { return this.addEstablishmentFormGroup.get('establishment.parking'); }

  get province() { return this.addEstablishmentFormGroup.get('address.province'); }
  get community() { return this.addEstablishmentFormGroup.get('address.community'); }
  get zipcode() { return this.addEstablishmentFormGroup.get('address.zipcode'); }
  get street() { return this.addEstablishmentFormGroup.get('address.street'); }
  get bus() { return this.addEstablishmentFormGroup.get('address.bus'); }

  get openingsuren() { return (this.addEstablishmentFormGroup.get('openingHours') as FormArray).controls; }
  get openingsuurMa() { return this.addEstablishmentFormGroup.get('openingHours.openingsuurMa'); }
  get sluitingsuurMa() { return this.addEstablishmentFormGroup.get('openingHours.sluitingsuurMa'); }
  get openingsuurDi() { return this.addEstablishmentFormGroup.get('openingHours.openingsuurDi'); }
  get sluitingsuurDi() { return this.addEstablishmentFormGroup.get('openingHours.sluitingsuurDi'); }
  get openingsuurWo() { return this.addEstablishmentFormGroup.get('openingHours.openingsuurWo'); }
  get sluitingsuurWo() { return this.addEstablishmentFormGroup.get('openingHours.sluitingsuurWo'); }
  get openingsuurDo() { return this.addEstablishmentFormGroup.get('openingHours.openingsuurDo'); }
  get sluitingsuurDo() { return this.addEstablishmentFormGroup.get('openingHours.sluitingsuurDo'); }
  get openingsuurVr() { return this.addEstablishmentFormGroup.get('openingHours.openingsuurVr'); }
  get sluitingsuurVr() { return this.addEstablishmentFormGroup.get('openingHours.sluitingsuurVr'); }
  get openingsuurZa() { return this.addEstablishmentFormGroup.get('openingHours.openingsuurZa'); }
  get sluitingsuurZa() { return this.addEstablishmentFormGroup.get('openingHours.sluitingsuurZa'); }
  get openingsuurZo() { return this.addEstablishmentFormGroup.get('openingHours.openingsuurZo'); }
  get sluitingsuurZo() { return this.addEstablishmentFormGroup.get('openingHours.sluitingsuurZo'); }

  get image() { return this.addEstablishmentFormGroup.get('image.image'); }

  // address
  onChangeProvince(event): void {
    let province: string = event.target.value;

    switch (province) {
      case 'Antwerpen': {
        this.changeProvinceStartValues(11001, 13053, 'Aartselaar', 2630, 'Acacialaan', '1');
        break;
      }
      case 'Limburg': {
        this.changeProvinceStartValues(71002, 72042, 'As', 3665, 'Acaciastraat', '1');
        break;
      }
      case 'Oost-Vlaanderen': {
        this.changeProvinceStartValues(41002, 46025, 'Aalst', 9300, '1 Meistraat', '1');
        break;
      }
      case 'Vlaams-Brabant': {
        this.changeProvinceStartValues(23002, 24137, 'Aarschot', 3200, "'s-Hertogenheide", '1');
        break;
      }
      case 'West-Vlaanderen': {
        this.changeProvinceStartValues(31003, 38025, 'Alveringem', 8690, 'Abeelestraat', 'Geen');
        break;
      }
    }
  }

  changeProvinceStartValues(start: number, end: number, value: string, zipcode: number, street: string, bus: string): void {
    this.communityStartId = start;
    this.communityEndId = end;
    this.community.setValue(value);
    this.zipcode.setValue(zipcode);
    this.street.setValue(street);
    this.bus.setValue(bus);
    this.setStreets();
  }

  onChangeCommunity(event): void {
    const location = event.target.value;
    this.community.setValue(location);
    this.setZipcode(location);
    this.setStreets();
  }

  setZipcode(location: string): void {
    this.placesService.getZipcodeByCommunity(this.community.value)
      .subscribe(data => {
        this.zipcode.setValue(data.postInfoObjecten[0].identificator.objectId);
      })
  }

  setStreets(): void {
    this.streets = [];
    this.placesService.getStreetsByCommunity(this.community.value)
      .subscribe(data => {
        data.straatnamen.sort((a, b) => {
          let aStraat: string = a.straatnaam.geografischeNaam.spelling;
          let bStraat: string = b.straatnaam.geografischeNaam.spelling;

          if(aStraat < bStraat) return -1;
          else if(aStraat > bStraat) return 1;
          return 0;
        }).forEach(sn => {
          this.streets.push(sn.straatnaam.geografischeNaam.spelling);
        })

        this.street.setValue(this.streets[0]);
        this.setBusNumbers();
      })
  }

  setBusNumbers(): void {
    let numbers = new Set<string>();
    this.busNumbers = [];
    this.placesService.getBusNumbers(this.zipcode.value, this.street.value)
      .subscribe(data => {
        data.adressen.forEach(hn => {
          if(hn.busnummer !== undefined)
            numbers.add(hn.huisnummer + ' bus ' + hn.busnummer);
          else
            numbers.add(hn.huisnummer);
        })

        if(numbers.size === 0) this.busNumbers.push('Geen');
        else {
          let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
          this.busNumbers = Array.from(numbers).sort(collator.compare);
        }

        this.bus.setValue(this.busNumbers[0]);
      })
  }

  onClocksChange(event): void {

    for(let i = 0; i < 7; i++) {

      if(this.openingsuren[i].value > this.openingsuren[i+6].value)
        this.openingsuren[i].setErrors({ 'invalidHour': true });

      if(this.openingsuren[i].value < this.openingsuren[i+6].value)
        this.openingsuren[i].setErrors(null);
    }

    // if(this.openingsuurMa.value > this.sluitingsuurMa.value)
    //   this.openingsuurMa.setErrors({ 'invalidHour': true });

    // if(this.openingsuurMa.value < this.sluitingsuurMa.value)
    //   this.openingsuurMa.setErrors(null);

  }

  onSubmit(): void {

  }
}
