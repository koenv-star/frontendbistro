import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorComponent} from './components/error/error.component';
import {HomeComponent} from './components/home/home.component';
import { CostumersListComponent } from './components/costumers-list/costumers-list.component';
import { LoginComponent } from './components/login/login.component';
import { AddEditEstablishmentComponent } from './components/add-edit-establishment/add-edit-establishment.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'costumerlist', component: CostumersListComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'error', component: ErrorComponent },
  { path: 'addestablishment', component: AddEditEstablishmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
