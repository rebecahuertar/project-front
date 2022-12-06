import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscadorListComponent } from './Components/buscador/buscador-list/buscador-list.component';
import { ClienteCuentaComponent } from './Components/cliente/cliente-cuenta/cliente-cuenta.component';
import { ComercioCuentaComponent } from './Components/comercio/comercio-cuenta/comercio-cuenta.component';
import { FavoritoComponent } from './Components/favorito/favorito.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';

import { ClienteFormComponent } from './Components/cliente/cliente-form/cliente-form.component';
import { ComercioFormComponent } from './Components/comercio/comercio-form/comercio-form.component';
import { ComercioViewComponent } from './Components/comercio/comercio-view/comercio-view.component';
import { HorarioFormComponent } from './Components/horario/horario-form/horario-form.component';
import { HorarioListComponent } from './Components/horario/horario-list/horario-list.component';
import { LoginComponent } from './Components/login/login.component';
import { MensajeClienteComponent } from './Components/mensaje/mensaje-cliente/mensaje-cliente.component';
import { MensajeComercioComponent } from './Components/mensaje/mensaje-comercio/mensaje-comercio.component';
import { ProductoComponent } from './Components/producto/producto.component';
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
    MensajeClienteComponent,
    FavoritoComponent,
    MensajeComercioComponent,
    HorarioListComponent,
    ProductoComponent,
    ClienteFormComponent,
    ComercioViewComponent,
    ComercioFormComponent,
    HorarioFormComponent,
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
