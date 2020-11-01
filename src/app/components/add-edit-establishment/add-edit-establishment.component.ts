import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlacesService } from 'src/app/services/places.service';
import { JammikValidators } from 'src/app/validators/jammik-validators';
import { allCommunities } from 'src/app/app.component';
import { Stringtool } from 'src/app/tools/stringtool';
import { Time } from '@angular/common';
import { Adres } from 'src/app/models/adres';
import { OpeningsUren } from 'src/app/models/openings-uren';
import { Dag } from 'src/app/models/dag';
import { ReturnStatement } from '@angular/compiler';
import { Tafel } from 'src/app/models/tafel';

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
  openingHours: AbstractControl[];
  timeInputs: HTMLElement[];

  // image
  imageUrl: string;
  picture: File;
  inputFileLabel: HTMLElement;

  // tables
  tafelStoelInputs: HTMLInputElement[];
  tafelStoelFeedback: string = '';

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
    this.openingHours = [this.openingsuurMa, this.sluitingsuurMa, this.openingsuurDi, this.sluitingsuurDi, this.openingsuurWo,
                        this.sluitingsuurWo, this.openingsuurDo, this.sluitingsuurDo, this.openingsuurVr, this.sluitingsuurVr,
                        this.openingsuurZa, this.sluitingsuurZa, this.openingsuurZo, this.sluitingsuurZo];
    this.timeInputs = Array.from(document.querySelectorAll('input[type=time]'));

    // image
    this.imageUrl = '';
    this.inputFileLabel = document.querySelector('.custom-file-label') as HTMLElement;
  }

  // build the form for adding an establishment
  buildForm(): void {
    this.addEstablishmentFormGroup = this.formBuilder.group({

      establishment: this.formBuilder.group({
        establishmentName: new FormControl('', [Validators.required, Validators.minLength(2), JammikValidators.notOnlyWhitespace]),
        parking: new FormControl()
      }),

      description: this.formBuilder.group({
        description: new FormControl('', [Validators.required, Validators.minLength(2), JammikValidators.notOnlyWhitespace])
      }),

      address: this.formBuilder.group({
        province: new FormControl('Antwerpen', [Validators.required]),
        community: new FormControl('Aartselaar', [Validators.required]),
        zipcode: new FormControl(2630, [Validators.required]),
        street: new FormControl('Acacialaan', [Validators.required, Validators.pattern(new RegExp(/^(?:(?!_).)*$/)), Validators.minLength(2), JammikValidators.notOnlyWhitespace]),
        bus: new FormControl('1', [Validators.required, JammikValidators.notOnlyWhitespace,
          JammikValidators.cannotBeGeen])
      }),

      openingHours: this.formBuilder.group({
        openingsuurMa: new FormControl('12:00'),
        sluitingsuurMa: new FormControl('12:00'),
        openingsuurDi: new FormControl('12:00'),
        sluitingsuurDi: new FormControl('12:00'),
        openingsuurWo: new FormControl('12:00'),
        sluitingsuurWo: new FormControl('12:00'),
        openingsuurDo: new FormControl('12:00'),
        sluitingsuurDo: new FormControl('12:00'),
        openingsuurVr: new FormControl('12:00'),
        sluitingsuurVr: new FormControl('12:00'),
        openingsuurZa: new FormControl('12:00'),
        sluitingsuurZa: new FormControl('12:00'),
        openingsuurZo: new FormControl('12:00'),
        sluitingsuurZo: new FormControl('12:00')
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

  get description() { return this.addEstablishmentFormGroup.get('description.description'); }

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

  // opening hours
  onClocksChange(): void {

    this.addEstablishmentFormGroup.get('openingHours').markAllAsTouched();

    for(let i = 0; i < this.openingHours.length; i+=2) {

      if(this.timeInputs[i].style.visibility === 'hidden')
        continue;

      let openingsTijd: Time = Stringtool.getHoursFromString(this.openingHours[i].value);
      let sluitingsTijd: Time = Stringtool.getHoursFromString(this.openingHours[i+1].value);

      if(this.openingHours[i].value > this.openingHours[i+1].value)
        this.openingHours[i].setErrors({ 'invalidHour': true });

      else if(this.openingHours[i+1].value === this.openingHours[i].value)
        this.openingHours[i].setErrors({ 'invalidHour': true });

      else if(sluitingsTijd.hours - openingsTijd.hours < 1 ||
        sluitingsTijd.hours - openingsTijd.hours === 1 && sluitingsTijd.minutes - openingsTijd.minutes < 0)
        this.openingHours[i].setErrors({ 'invalidHour': true });

      else if(this.openingHours[i+1] > this.openingHours[i].value)
        this.openingHours[i].setErrors(null);
    }
  }

  onOpenCloseToggle(begin: number, end: number, event): void {

    let btn = event.target;
    if(btn.innerText === 'Gesloten') {
      this.openingHours[begin].setErrors(null);
      // this.openingHours[begin].setValue('00:00');
      // this.openingHours[end].setValue('00:00');
      this.timeInputs[begin].style.visibility = 'hidden';
      this.timeInputs[end].style.visibility = 'hidden';
      btn.innerText = 'Open';
    } else {
      // this.openingHours[begin].setValue('00:00');
      // this.openingHours[end].setValue('00:00');
      this.timeInputs[begin].style.visibility = 'visible';
      this.timeInputs[end].style.visibility = 'visible';
      btn.innerText = 'Gesloten';
    }
  }

  // image
  onFileSelected(event): void {
    this.picture = event.target.files[0];
    this.inputFileLabel.innerText = this.picture.name;

    // show image preview
    let reader = new FileReader();
    reader.readAsDataURL(this.picture);
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
  }

  goToNextSection(event): void {

    // if(this.addEstablishmentFormGroup.invalid) {
    //   this.addEstablishmentFormGroup.markAllAsTouched();
    //   this.onClocksChange();
    //   return;
    // }

    const firstPart = document.querySelector('#firstPart') as HTMLElement;
    const secondPart = document.querySelector('#secondPart') as HTMLElement;
    const btnContainer = document.querySelector('#goToNextBtnContainer') as HTMLElement;
    firstPart.classList.add('slide-left');
    secondPart.classList.add('slide-left2');
    secondPart.style.display = 'block';
    btnContainer.style.display = 'none';
  }

  // tafels en stoelen
  checkForInvalidTableFields(): boolean {

    this.tafelStoelInputs = Array.from(document.querySelectorAll("input[type=number]"));

    for(let input of this.tafelStoelInputs) {

      if(input.value.length < 1) {
        this.tafelStoelFeedback = 'Er zijn lege velden';
        return false;
      } else if (input.value === '0') {
        this.tafelStoelFeedback = 'De waarde kan niet 0 zijn';
        return false;
      }
    }

    this.tafelStoelFeedback = '';
    return true;
  }

  checkForDuplicateTafelStoelValues(): boolean {

    this.tafelStoelInputs = Array.from(document.querySelectorAll("input[type=number]"));
    let tafelAmountA: number;
    let stoelAmountA: number;
    let tafelAmountB: number;
    let stoelAmountB: number;

    for(let i = 0; i < this.tafelStoelInputs.length; i += 2) {
      tafelAmountA = Number.parseInt(this.tafelStoelInputs[i].value);
      stoelAmountA = Number.parseInt(this.tafelStoelInputs[i+1].value);

      for(let j = i + 2; j < this.tafelStoelInputs.length; j += 2) {
        tafelAmountB = Number.parseInt(this.tafelStoelInputs[j].value);
        stoelAmountB = Number.parseInt(this.tafelStoelInputs[j+1].value);

        if(tafelAmountA === tafelAmountB && stoelAmountA === stoelAmountB) {
          this.tafelStoelFeedback = 'Zelfde aantal tafels en stoelen';
          return false;
        }
      }
    }

    this.tafelStoelFeedback = '';
    return true;
  }

  checkAmountOfTableInputs(): boolean {

    this.tafelStoelInputs = Array.from(document.querySelectorAll("input[type=number]"));
    if(this.tafelStoelInputs.length < 2) {
      this.tafelStoelFeedback = 'Geen tafels zijn toegevoegd';
      return false;
    }

    this.tafelStoelFeedback = '';
    return true;
  }

  addTable(): void {
    if(!this.checkForInvalidTableFields()) return;
    if(!this.checkForDuplicateTafelStoelValues()) return;

    const secondPart = document.querySelector('#secondPart');
    secondPart.querySelector('.form-group')
      .insertAdjacentHTML('beforeend', `<div class="row mt-2 table-chair-box">
      <div class="col-sm-12 input-group">
        <div class="btn btn-primary mx-auto" style="background: #0275d8 !important; transition: none; cursor: auto;">
          <input onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57" type="number" class="table-chair" />
          tafel(s) met
          <input onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57" type="number" class="table-chair" />
          <i class="fas fa-chair ml-1"></i>
          en
        </div>
      </div>
    </div>`);
  }

  removeTable(): void {

    this.tafelStoelFeedback = '';

    const formGroup = document.querySelector('.form-group') as HTMLElement;
    const tables = Array.from(formGroup.querySelectorAll('.row'));
    if(tables.length === 1) return;

    formGroup.removeChild(tables[tables.length -1]);
  }

  makeAddress(): Adres {
    let street = this.street.value;
    let bus = this.bus.value;
    let zipcode = this.zipcode.value;
    let community = this.community.value;
    return new Adres(0, street, bus, zipcode, community);
  }

  makeOpeningsUren(): OpeningsUren {
    let days: Dag[] = [
      new Dag('Maandag', this.openingsuurMa.value, this.sluitingsuurMa.value),
      new Dag('Dinsdag', this.openingsuurDi.value, this.sluitingsuurDi.value),
      new Dag('Woensdag', this.openingsuurWo.value, this.sluitingsuurWo.value),
      new Dag('Donderdag', this.openingsuurDo.value, this.sluitingsuurDo.value),
      new Dag('Vrijdag', this.openingsuurVr.value, this.sluitingsuurVr.value),
      new Dag('Zaterdag', this.openingsuurZa.value, this.sluitingsuurZa.value),
      new Dag('Zondag', this.openingsuurZo.value, this.sluitingsuurZo.value)
    ];

    return new OpeningsUren(0, days);
  }

  makeTafels(): Tafel[] {

    let tafels: Tafel[] = [];
    this.tafelStoelInputs = Array.from(document.querySelectorAll('input[type=number]'));

    for(let i = 0; i < this.tafelStoelInputs.length; i += 2) {
      let tafelAmount: number = Number.parseInt(this.tafelStoelInputs[i].value);
      let stoelAmount: number = Number.parseInt(this.tafelStoelInputs[i+1].value);

      for(let j = 1; j <= tafelAmount; j++) {
        tafels.push(new Tafel(0, stoelAmount));
      }
    }

    return tafels;
  }

  onSubmit(): void {

    if(!this.checkForInvalidTableFields()) return;
    if(!this.checkAmountOfTableInputs()) return;
    if(!this.checkForDuplicateTafelStoelValues()) return;

    // making zaak object
    let adres: Adres = this.makeAddress();
    let openingsUren: OpeningsUren = this.makeOpeningsUren();
    let tafels: Tafel[] = this.makeTafels();
    this.tafelStoelInputs = Array.from(document.querySelectorAll(".table-chair"));
  }
}
