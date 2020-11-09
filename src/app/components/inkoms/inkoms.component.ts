import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {InkomService} from '../../services/inkom.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {isNull} from "util";
import {AuthenticationService} from '../../services/authentication.service';
import {AccountService} from '../../services/account.service';
import {Uitbater} from '../../models/uitbater';
import {Inkom} from '../../models/Inkom';

@Component({
  selector: 'app-inkoms',
  templateUrl: './inkoms.component.html',
  styleUrls: ['./inkoms.component.css']
})
export class InkomsComponent implements OnInit {
  uitbater: Uitbater;
  inkomList: Inkom[];
  inkom: Inkom;
  totalInkom:number;
  constructor(private router: Router,
              private serviceInkom: InkomService,
              private serviceToken : TokenStorageService,
              private serviceAuth: AuthenticationService,
              private serviceAccount: AccountService,
  ) { }

  ngOnInit(): void {
    let user = this.serviceToken.getUser();
    if(!isNull(user)){
      this.serviceInkom.getInkomsAll(user.email).subscribe(data => {
        this.inkomList = data;

        for(let inkom of this.inkomList){
          this.totalInkom += inkom.totalEarning;
        }
      })
    }



  }
  getZaakOverzicht(zaakId:number){
    this.serviceInkom.getInkomsByZaakId(zaakId).subscribe(data =>{
      this.inkom = data;
    })
    let view = document.querySelector('.firstView') as HTMLElement;
    let view2 = document.querySelector('.secondView') as HTMLElement;
    view.style.display = 'none';
    view.style.animation = 'leftSlider 2s ease forwards';
    view.style.transition = '2s';
    view.classList.add('leftSlider');
    view2.style.animation = 'rightSlider 2s ease forwards';
    view2.style.display = 'block';
    view2.classList.add('rightSlider');

  }

}
