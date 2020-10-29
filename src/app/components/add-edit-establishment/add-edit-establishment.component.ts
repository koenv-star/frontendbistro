import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  allCommunities = allCommunities;
  communityStartId: number = 11001;
  communityEndId: number = 13053;
  streets: string[];
  busNumbers: string[];

  constructor(private formBuilder: FormBuilder,
    private placesService: PlacesService) { }

  ngOnInit(): void {
    this.buildForm();
    this.streets = new Array();
    this.setStreets();
    this.busNumbers = new Array();
    this.setBusNumbers();
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
        openingsuurMa: new FormControl('Openingsuur:', [JammikValidators.valueCannotBeOpeningsuur]),
        sluitingsuurMa: new FormControl('Sluitingsuur:', [JammikValidators.valueCannotBeSluitingsuur]),
        openingsuurDi: new FormControl('Openingsuur:', [JammikValidators.valueCannotBeOpeningsuur]),
        sluitingsuurDi: new FormControl('Sluitingsuur:', [JammikValidators.valueCannotBeSluitingsuur]),
        openingsuurWo: new FormControl('Openingsuur:', [JammikValidators.valueCannotBeOpeningsuur]),
        sluitingsuurWo: new FormControl('Sluitingsuur:', [JammikValidators.valueCannotBeSluitingsuur]),
        openingsuurDo: new FormControl('Openingsuur:', [JammikValidators.valueCannotBeOpeningsuur]),
        sluitingsuurDo: new FormControl('Sluitingsuur:', [JammikValidators.valueCannotBeSluitingsuur]),
        openingsuurVr: new FormControl('Openingsuur:', [JammikValidators.valueCannotBeOpeningsuur]),
        sluitingsuurVr: new FormControl('Sluitingsuur:', [JammikValidators.valueCannotBeSluitingsuur]),
        openingsuurZa: new FormControl('Openingsuur:', [JammikValidators.valueCannotBeOpeningsuur]),
        sluitingsuurZa: new FormControl('Sluitingsuur:', [JammikValidators.valueCannotBeSluitingsuur]),
        openingsuurZo: new FormControl('Openingsuur:', [JammikValidators.valueCannotBeOpeningsuur]),
        sluitingsuurZo: new FormControl('Sluitingsuur:', [JammikValidators.valueCannotBeSluitingsuur])
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

  get openingsuurMa() { return this.addEstablishmentFormGroup.get('openingHours.openingsuurMa'); }
  get suitingsuurMa() { return this.addEstablishmentFormGroup.get('openingHours.suitingsuurMa'); }
  get openingsuurDi() { return this.addEstablishmentFormGroup.get('openingHours.openingsuurDi'); }
  get suitingsuurDi() { return this.addEstablishmentFormGroup.get('openingHours.suitingsuurDi'); }
  get openingsuurWo() { return this.addEstablishmentFormGroup.get('openingHours.openingsuurWo'); }
  get suitingsuurWo() { return this.addEstablishmentFormGroup.get('openingHours.suitingsuurWo'); }
  get openingsuurDo() { return this.addEstablishmentFormGroup.get('openingHours.openingsuurDo'); }
  get suitingsuurDo() { return this.addEstablishmentFormGroup.get('openingHours.suitingsuurDo'); }
  get openingsuurVr() { return this.addEstablishmentFormGroup.get('openingHours.openingsuurVr'); }
  get suitingsuurVr() { return this.addEstablishmentFormGroup.get('openingHours.suitingsuurVr'); }
  get openingsuurZa() { return this.addEstablishmentFormGroup.get('openingHours.openingsuurZa'); }
  get suitingsuurZa() { return this.addEstablishmentFormGroup.get('openingHours.suitingsuurZa'); }
  get openingsuurZo() { return this.addEstablishmentFormGroup.get('openingHours.openingsuurZo'); }
  get suitingsuurZo() { return this.addEstablishmentFormGroup.get('openingHours.suitingsuurZo'); }

  get image() { return this.addEstablishmentFormGroup.get('image.image'); }

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
    console.log(this.community.value);
    console.log(this.street.value);
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

  onSubmit(): void {

  }
}
