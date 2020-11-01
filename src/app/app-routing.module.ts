import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorComponent} from './components/error/error.component';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import { CostumersListComponent } from './components/costumers-list/costumers-list.component';
import { LoginComponent } from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { MenuComponent } from './components/menu/menu.component';
import { ZakenComponent } from './components/zaken/zaken.component';
import { AddmenuComponent } from './components/addmenu/addmenu.component';
import { ZaakComponent } from './components/zaak/zaak.component';



const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'costumerlist', component: CostumersListComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'zaken', component: ZakenComponent },
  { path: 'addmenu', component:AddmenuComponent }
  { path: 'zaken/:id', component: ZaakComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
