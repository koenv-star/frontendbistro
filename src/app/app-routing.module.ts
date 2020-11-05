import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorComponent} from './components/error/error.component';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { MenuComponent } from './components/menu/menu.component';
import { ZakenComponent } from './components/zaken/zaken.component';
import { AddmenuComponent } from './components/addmenu/addmenu.component';
import { ZaakComponent } from './components/zaak/zaak.component';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {AdsComponent} from './components/ads/ads.component';
import { AddEditEstablishmentComponent } from './components/add-edit-establishment/add-edit-establishment.component';
import {AllZakenComponent} from './components/all-zaken/all-zaken.component';





const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'error', component: ErrorComponent },
   { path: 'addestablishment', component: AddEditEstablishmentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'MyAccount', component: MyAccountComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'menu/:zaakNaam', component: MenuComponent },
  { path: 'zaken', component: ZakenComponent },
  { path: 'menu/:zaakNaam/addmenu', component:AddmenuComponent },
  { path: 'zaken/:id', component: ZaakComponent },
  { path: 'ads', component:AdsComponent},
  { path: 'allZaken', component: AllZakenComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
