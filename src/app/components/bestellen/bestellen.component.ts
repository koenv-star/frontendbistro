import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
=======
import { Bestelling } from 'src/app/models/bestelling';
import { BestellenService } from 'src/app/services/bestellen.service';
>>>>>>> Stashed changes

@Component({
  selector: 'app-bestellen',
  templateUrl: './bestellen.component.html',
  styleUrls: ['./bestellen.component.css']
})
export class BestellenComponent implements OnInit {
<<<<<<< Updated upstream

  constructor() { }

  ngOnInit(): void {
  }

=======
  numbers:number[];
  bestellingen:Bestelling[];

  constructor(private bestellenService:BestellenService) {
    this.numbers = this.bestellenService.getNumbers() != null ? this.bestellenService.getNumbers() : new Array;  
    this.bestellingen = this.bestellenService.getBestellingen() != null ? this.bestellenService.getBestellingen() : new Array;  
    console.log(this.numbers);
    console.log(this.bestellingen);
   }

  ngOnInit(): void {

  }
>>>>>>> Stashed changes
}
