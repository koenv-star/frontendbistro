import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {BroadcastServiceService} from '../services/BroadcastService/broadcast-service.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ErrorComponent implements OnInit {
  message;
  erNumber;
  constructor(public boradcastService: BroadcastServiceService) {
  }

  ngOnInit(): void {
      this.boradcastService.errorNumber.asObservable().subscribe(values => {
        console.log(values);
        this.erNumber = values;
      });
      this.boradcastService.errorMessage.asObservable().subscribe(value => {
        console.log(value);
        this.message = value;
      });
  }




}
