import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorComponent} from './components/error/error.component';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import { CostumersListComponent } from './components/costumers-list/costumers-list.component';
import { LoginComponent } from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {MyAccountComponent} from './components/my-account/my-account.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'costumerlist', component: CostumersListComponent },
  { path: 'MyAccount', component: MyAccountComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
