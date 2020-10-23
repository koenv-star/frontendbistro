import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Costumer } from 'src/app/models/costumer';
import { Owner } from 'src/app/models/owner';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
register: FormGroup;
newCostumer: Costumer;
newOwner: Owner;


  constructor() { }

  ngOnInit(): void {
  }

}
