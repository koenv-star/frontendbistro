import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlacesService } from 'src/app/services/places.service';
import { JammikValidators } from 'src/app/validators/jammik-validators';

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
  allCommunities: any[];
  selectedCommunities: any[];

  constructor(private formBuilder: FormBuilder,
    private placesService: PlacesService) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadAllPlaces();
    this.allCommunities = new Array();
    this.selectedCommunities = new Array();
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
        community: new FormControl('', [Validators.required]),
        zipcode: new FormControl('', [Validators.required, Validators.pattern(new RegExp(/^\\d{4}$/))]),
        street: new FormControl('', [Validators.required, Validators.pattern(new RegExp(/^(?:(?!_).)*$/)), Validators.minLength(2), JammikValidators.notOnlyWhitespace]),
        bus: new FormControl('', [Validators.required, Validators.minLength(2), JammikValidators.notOnlyWhitespace])
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

  loadAllPlaces(): void {
    this.placesService.getPlaces()
      .subscribe(data => {
        data.gemeenten.filter(g => {
          let id = g.detail.substring(54,);
          id = Number.parseInt(id);
          return (id >= 11001 && id <= 13053) || (id >= 23002 && id <= 24137) || (id >= 31003 && id <= 38025)
            || (id >= 41002 && id <= 46025) || (id >= 71002 && id <= 72042);
        }).forEach(g => {
          let id = g.detail.substring(54,);
          id = Number.parseInt(id);
          this.allCommunities.push({ id: id, name: g.gemeentenaam.geografischeNaam.spelling });
        });

        this.fillSelectedCommunities(11001, 13053);
      });
  }

  fillSelectedCommunities(begin: number, end: number): void {

    this.selectedCommunities = [];

    this.allCommunities.forEach(c => {
      if(c.id >= begin && c.id <= end)
        this.selectedCommunities.push(c);
    });

    this.selectedCommunities.sort((a, b) => {

      if(a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    })
  }

  changeProvince(event): void {
    let province: string = event.target.value;
    let begin: number;
    let end: number;

    switch (province) {
      case 'Antwerpen': {
        begin = 11001;
        end = 13053;
        break;
      }
      case 'Limburg': {
        begin = 71002;
        end = 72042;
        break;
      }
      case 'Oost-Vlaanderen': {
        begin = 41002;
        end = 46025;
        break;
      }
      case 'Vlaams-Brabant': {
        begin = 23002;
        end = 24137;
        break;
      }
      case 'West-Vlaanderen': {
        begin = 31003;
        end = 38025;
        break;
      }
    }

    this.fillSelectedCommunities(begin, end);
  }

  onSubmit(): void {

  }
}
