import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlacesService } from 'src/app/services/places.service';
import { JammikValidators } from 'src/app/validators/jammik-validators';

@Component({
  selector: 'app-add-edit-establishment',
  templateUrl: './add-edit-establishment.component.html',
  styleUrls: ['./add-edit-establishment.component.css']
})
export class AddEditEstablishmentComponent implements OnInit {

  addEstablishmentFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private placesService: PlacesService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  // build the form for adding an establishment
  buildForm(): void {
    this.addEstablishmentFormGroup = this.formBuilder.group({

      establishment: this.formBuilder.group({
        establishmentName: new FormControl('', [Validators.required, Validators.minLength(2), JammikValidators.notOnlyWhitespace]),
        parking: new FormControl()
      }),

      address: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), JammikValidators.notOnlyWhitespace]),
        bus: new FormControl('', [Validators.required, Validators.minLength(2), JammikValidators.notOnlyWhitespace]),
        zipcode: new FormControl('', [Validators.required, Validators.pattern(new RegExp(/^\\d{4}$/))]),
        community: new FormControl('', [Validators.required, Validators.minLength(2)])
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

  get street() { return this.addEstablishmentFormGroup.get('address.street'); }
  get bus() { return this.addEstablishmentFormGroup.get('address.bus'); }
  get zipcode() { return this.addEstablishmentFormGroup.get('address.zipcode'); }
  get community() { return this.addEstablishmentFormGroup.get('address.community'); }

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

  onSubmit(): void {

  }

  getPlaces(): void {
    this.placesService.getPlaces()
      .subscribe(data => {
        console.log(data);
      })
  }

}
