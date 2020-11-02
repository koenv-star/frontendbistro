import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Dag} from 'src/app/models/dag';
import {Zaak} from 'src/app/models/zaak';
import {ZaakService} from 'src/app/services/zaak.service';


@Component({
  selector: 'app-zaak',
  templateUrl: './zaak.component.html',
  styleUrls: ['./zaak.component.css']
})
export class ZaakComponent implements OnInit {
  zaak: Zaak = new Zaak();

  constructor(private zaakService: ZaakService,
              private router: Router,
              private route: ActivatedRoute) {

    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.getZaak(id).subscribe(res => {
      this.zaak = res;
      if (res.imageURL == null) {
        this.zaak.imageURL = 'assets\\images\\restaurants\\placeholder.jpg';
      } else {
        this.zaak.imageURL = res.imageURL;
      }
    });
    ;
  }

  public getZaak(id: number): Observable<Zaak> {
    return this.zaakService.getZaak(id);
  }

  ngOnInit(): void {

  }

  public isGesloten(dag: Dag): boolean {
    return dag.openingsUur == dag.sluitingsUur;
  }
}
