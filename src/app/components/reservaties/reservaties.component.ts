import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservatie } from 'src/app/models/reservatie';
import { ReservatieService } from 'src/app/services/reservatie.service';

@Component({
  selector: 'app-reservaties',
  templateUrl: './reservaties.component.html',
  styleUrls: ['./reservaties.component.css'],
})
export class ReservatiesComponent implements OnInit {
  reservaties: Reservatie[];
  id: number;
  constructor(
    private route: ActivatedRoute,
    private reservatiesservice: ReservatieService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.getReservatiesByZaakId(this.id);
  }

  getReservatiesByZaakId(id) {
    this.reservatiesservice.getReservatiesByZaakId(id).subscribe((data) => {
      this.reservaties = data;
    });
  }
}
