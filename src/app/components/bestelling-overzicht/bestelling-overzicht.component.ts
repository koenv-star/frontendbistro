import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bestelling } from 'src/app/models/bestelling';
import { BestellingVerzameling } from 'src/app/models/bestelling-verzameling';
import { Zaak } from 'src/app/models/zaak';
import { BestellingVerzamelingService } from 'src/app/services/bestelling-verzameling-service.service';
import { ZaakService } from 'src/app/services/zaak.service';

@Component({
  selector: 'app-bestelling-overzicht',
  templateUrl: './bestelling-overzicht.component.html',
  styleUrls: ['./bestelling-overzicht.component.css']
})
export class BestellingOverzichtComponent implements OnInit {
  zaak:Zaak;
  besGroup:Bestelling[][];
  besver:BestellingVerzameling[];

  constructor(private zaakservice:ZaakService, private route: ActivatedRoute, private bestellingVerzamelingService:BestellingVerzamelingService) {
    this.zaak = new Zaak(0,null,null,null,false, 5, null, null, null, null, null, new Array(), null);
    this.zaakservice.getzaakByNaam(this.route.snapshot.paramMap.get('zaakNaam')).subscribe(res => {this.zaak = res;

      let verzamelIds = new Array();
      this.besGroup = new Array();
      let bestellingen = this.zaak.bestellingen.reverse();
      console.log(bestellingen);    
      for (let i = 0; i < bestellingen.length; i++) {
        let contains:boolean = false;
        //check if id is already mached
        for(let j = 0; j < verzamelIds.length && !contains; j++) {
          if (verzamelIds[j] == bestellingen[i].bestellingVerzamelingId) {
            // id = same
            this.besGroup[j][this.besGroup[j].length] = bestellingen[i];
            contains = true;
          }
        }
        if(!contains) {
          let spot:number = verzamelIds.length;
          verzamelIds[spot] = bestellingen[i].bestellingVerzamelingId;
          this.besGroup[spot] = new Array();
          this.besGroup[spot][0] = bestellingen[i];
        }
      }
      this.besver = new Array();
      for(let i = 0; i < verzamelIds.length; i++) {
        this.bestellingVerzamelingService.getBestellingVerzamelingById(verzamelIds[i]).subscribe(res => {this.besver[i] = res;
        if(this.besver[i].message == null || this.besver[i].message == "") {
          this.besver[i].message = "None"
        }
        });
      }
    });
  }

  ngOnInit(): void {
    
  }

}
