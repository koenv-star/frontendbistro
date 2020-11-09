import { Component, OnInit } from '@angular/core';
import { BestellingVerzameling } from 'src/app/models/bestelling-verzameling';
import { User } from 'src/app/models/user';
import { BestellingVerzamelingService } from 'src/app/services/bestelling-verzameling-service.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ZaakService } from 'src/app/services/zaak.service';

@Component({
  selector: 'app-bestelling-overzicht-klant',
  templateUrl: './bestelling-overzicht-klant.component.html',
  styleUrls: ['./bestelling-overzicht-klant.component.css']
})
export class BestellingOverzichtKlantComponent implements OnInit {
  user;
  list:BestellingVerzameling[];
  namen:string[][];


  constructor(private bestellingVerzamelingService:BestellingVerzamelingService, private userService:TokenStorageService,private zakenService:ZaakService) {
    this.user = this.userService.getUser();
    bestellingVerzamelingService.getBestellingVerzamelingenByEmail(this.user.email).subscribe(res => {
      this.list = res.reverse();
      this.namen = new Array();
      for(let i = 0; i < this.list.length; i++) {
        this.namen[i] = new Array();
        for (let j = 0; j < this.list[i].bestellingen.length; j++) {
          this.zakenService.getZaak(this.list[i].bestellingen[j].zaakId).subscribe(res => this.namen[i][j] = res.naam);
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
