import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  zaaknaam: String;
  zaak: Zaak;
  reservatieForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private reservatiesservice: ReservatieService,
    private zaakService: ZaakService
  ) {}

  ngOnInit(): void {
    this.reservatieForm = new FormGroup({
      datum: new FormControl('', Validators.required),
      personen: new FormControl('', [
        Validators.pattern('[0-9]{1,3}'),
        Validators.required,
      ]),
    });
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.getReservatiesByZaakId(this.id);
  }

  getReservatiesByZaakId(id) {
    this.reservatiesservice.getReservatiesByZaakId(id).subscribe((data) => {
      this.reservaties = data;
    });
  }

  getZaak() {
    this.zaakService.getZaak(this.id).subscribe((data) => {
      this.zaak = data;
    });
  }

  get personen() {
    return this.reservatieForm.get('personen');
  }

  get datum() {
    return this.reservatieForm.get('datum');
  }
}
