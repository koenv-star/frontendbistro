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
  totalInkom:number=0;
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

        for (let value of data) {
          if(!isNaN(value.totalEarning)){
            this.totalInkom += value.totalEarning;
          }
        }

      })
    }

  }


}
