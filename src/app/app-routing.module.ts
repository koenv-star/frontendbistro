import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorComponent} from './components/error/error.component';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';


const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full' },
  {path: 'header', component: HeaderComponent },
  {path: 'footer', component: FooterComponent },
  {path: 'error', component: ErrorComponent },
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
