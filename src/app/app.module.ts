import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscadorListComponent } from './Components/buscador/buscador-list/buscador-list.component';
import { ClienteCuentaComponent } from './Components/cliente/cliente-cuenta/cliente-cuenta.component';
import { ComercioCuentaComponent } from './Components/comercio/comercio-cuenta/comercio-cuenta.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterClienteComponent } from './Components/register/register-cliente/register-cliente.component';
import { RegisterComercioComponent } from './Components/register/register-comercio/register-comercio.component';
import { RegisterComponent } from './Components/register/register.component';
import { AuthInterceptorService } from './Services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ComercioCuentaComponent,
    ClienteCuentaComponent,
    BuscadorListComponent,
    RegisterComercioComponent,
    RegisterClienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
