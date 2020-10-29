import { Component } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Owner} from './models/owner';
import {Costumer} from './models/costumer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jammik';

}
