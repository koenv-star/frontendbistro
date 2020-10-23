import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorComponent} from './component/error/error.component';
import {HomeComponent} from './component/home/home.component';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';


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
