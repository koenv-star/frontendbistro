import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorComponent} from './error/error.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';


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
