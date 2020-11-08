import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './helpers/auth-interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttperrorinterceptorService } from './services/httperrorinterceptor.service';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AddEditEstablishmentComponent } from './components/add-edit-establishment/add-edit-establishment.component';
import { MenuComponent } from './components/menu/menu.component';
import { ZakenComponent } from './components/zaken/zaken.component';
import { AddmenuComponent } from './components/addmenu/addmenu.component';
import { ZaakComponent } from './components/zaak/zaak.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { AdsComponent } from './components/ads/ads.component';
import { KredietComponent } from './components/krediet/krediet.component';
import { AllZakenComponent } from './components/all-zaken/all-zaken.component';
import { ReservatiesComponent } from './components/reservaties/reservaties.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin

import { ZakenKlantLijstComponent } from './components/zaken-klant-lijst/zaken-klant-lijst.component';
import { BestellenComponent } from './components/bestellen/bestellen.component';
import { CalendarsComponent } from './components/calendars/calendars.component';
import { CommonModule } from '@angular/common';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AddEditEstablishmentComponent,
    RegisterComponent,
    MenuComponent,
    ZakenComponent,
    AddmenuComponent,
    ZaakComponent,
    MyAccountComponent,
    AdsComponent,
    KredietComponent,
    AllZakenComponent,
    ReservatiesComponent,

    ZakenKlantLijstComponent,
    BestellenComponent,
    CalendarsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttperrorinterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
