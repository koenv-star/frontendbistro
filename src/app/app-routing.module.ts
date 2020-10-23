import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CostumersListComponent } from './components/costumers-list/costumers-list.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'costumerlist', component: CostumersListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
