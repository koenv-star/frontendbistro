import { Component, OnInit } from '@angular/core';
import { Costumer } from 'src/app/models/costumer';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-costumers-list',
  templateUrl: './costumers-list.component.html',
  styleUrls: ['./costumers-list.component.css']
})
export class CostumersListComponent implements OnInit {

  costumerList : Costumer[];
  
  

  constructor(private service: AuthenticationService) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
     this.service.list().subscribe((data) => {
      this.costumerList = data;
      console.log(this.costumerList);
    });
    
  }

}
