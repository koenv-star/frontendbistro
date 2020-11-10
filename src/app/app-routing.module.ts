import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorComponent} from './components/error/error.component';
import {HomeComponent} from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { MenuComponent } from './components/menu/menu.component';
import { ZakenComponent } from './components/zaken/zaken.component';
import { AddmenuComponent } from './components/addmenu/addmenu.component';
import { ZaakComponent } from './components/zaak/zaak.component';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {AdsComponent} from './components/ads/ads.component';
import { AddEditEstablishmentComponent } from './components/add-edit-establishment/add-edit-establishment.component';
import { ZakenKlantLijstComponent } from './components/zaken-klant-lijst/zaken-klant-lijst.component';
import { AllZakenComponent } from './components/all-zaken/all-zaken.component';
import { BestellenComponent } from './components/bestellen/bestellen.component';
import {InkomsComponent} from './components/inkoms/inkoms.component';
import { BestellingOverzichtComponent } from './components/bestelling-overzicht/bestelling-overzicht.component';
import { BestellingOverzichtKlantComponent } from './components/bestelling-overzicht-klant/bestelling-overzicht-klant.component';
import {KredietComponent} from './components/krediet/krediet.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'error', component: ErrorComponent },
  { path: 'addestablishment', component: AddEditEstablishmentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'MyAccount', component: MyAccountComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'menu/:zaakNaam', component: MenuComponent },
  { path: 'zaken', component: ZakenComponent },
  { path: 'menu/:zaakNaam/addmenu', component:AddmenuComponent },
  { path: 'zaken/:id', component: ZaakComponent },
  { path: 'ads', component:AdsComponent},
  { path: 'allZaken', component: AllZakenComponent},
  { path: 'zaken-dichtbij', component: ZakenKlantLijstComponent },
  { path: 'bestellen', component: BestellenComponent},
  { path: 'inkoms', component: InkomsComponent},
  { path: 'zaak/:zaakNaam/bestellingen', component: BestellingOverzichtComponent},
  { path: 'klant/bestellingen', component: BestellingOverzichtKlantComponent},
  { path: 'krediet', component: KredietComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
