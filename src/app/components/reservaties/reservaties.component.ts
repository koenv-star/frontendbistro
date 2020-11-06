import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Reservatie } from 'src/app/models/reservatie';
import { Zaak } from 'src/app/models/zaak';
import { ReservatieService } from 'src/app/services/reservatie.service';
import { ZaakService } from 'src/app/services/zaak.service';

@Component({
  selector: 'app-reservaties',
  templateUrl: './reservaties.component.html',
  styleUrls: ['./reservaties.component.css'],
})
export class ReservatiesComponent implements OnInit {
  reservaties: Reservatie[];
  id: number;
  zaak: Zaak;
  reservatieForm: FormGroup;
  tafels: Map<number, number>;

  constructor(
    private route: ActivatedRoute,
    private reservatiesservice: ReservatieService,
    private zaakService: ZaakService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.getReservatiesByZaakId(this.id);
    this.getZaak();
    this.reservatieForm = new FormGroup({
      datum: new FormControl('', Validators.required),
      personen: new FormControl('', [
        Validators.pattern('[0-9]{1,3}'),
        Validators.required,
      ]),
    });
  }

  getReservatiesByZaakId(id) {
    this.reservatiesservice.getReservatiesByZaakId(id).subscribe((data) => {
      this.reservaties = data;
      console.log(this.reservaties);
    });
  }

  getZaak() {
    this.zaakService.getZaak(this.id).subscribe((data) => {
      this.zaak = data;
      console.log(this.zaak);
    });
  }

  aantaltafelsmetzelfdeaantalstoelen() {

    for (let tafel of this.zaak.tafels) {
      this.tafels.set(tafel.stoelen, this.tafels.get(tafel.stoelen) + 1);
    }
  }

  get personen() {
    return this.reservatieForm.get('personen');
  }

  get datum() {
    return this.reservatieForm.get('datum');
  }
}
