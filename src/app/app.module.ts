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
import { AllZakenComponent } from './all-zaken/all-zaken.component';

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
    AllZakenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
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
