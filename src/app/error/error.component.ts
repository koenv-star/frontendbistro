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
  customMessage;
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
      if (this.erNumber == 500){
        this.customMessage = 'Oops, There is a error with ... ';
      } else if (this.erNumber == 400){
        this.customMessage = 'Please don\'t make more bad requests';
      }
      else if ( this.erNumber == 404){
        this.customMessage = 'Oops, We couldn\'t find the page you were looking for... ';
      }else{
        this.customMessage = 'Oops,Something went wrong...';
      }
  }




}
