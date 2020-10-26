import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Costumer } from 'src/app/models/costumer';
import { Owner } from 'src/app/models/owner';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
registerForm: FormGroup;
newCostumer: Costumer;
newOwner: Owner;
registerStatus = false;


  constructor() { }

  ngOnInit(): void {
  }



  register(): void{

  }

}
