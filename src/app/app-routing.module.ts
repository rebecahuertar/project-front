import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AperturaComponent } from './Components/apertura/apertura.component';
import { BuscadorListComponent } from './Components/buscador/buscador-list/buscador-list.component';
import { ClienteCuentaComponent } from './Components/cliente/cliente-cuenta/cliente-cuenta.component';
import { ClienteFormComponent } from './Components/cliente/cliente-form/cliente-form.component';
import { ComercioCuentaComponent } from './Components/comercio/comercio-cuenta/comercio-cuenta.component';
import { ComercioViewComponent } from './Components/comercio/comercio-view/comercio-view.component';
import { FavoritoComponent } from './Components/favorito/favorito.component';
import { HomeComponent } from './Components/home/home.component';
import { HorarioListComponent } from './Components/horario/horario-list/horario-list.component';
import { LoginComponent } from './Components/login/login.component';
import { MensajeClienteComponent } from './Components/mensaje/mensaje-cliente/mensaje-cliente.component';
import { MensajeComercioComponent } from './Components/mensaje/mensaje-comercio/mensaje-comercio.component';
import { ProductoComponent } from './Components/producto/producto.component';
import { RegisterClienteComponent } from './Components/register/register-cliente/register-cliente.component';
import { RegisterComercioComponent } from './Components/register/register-comercio/register-comercio.component';
import { RegisterComponent } from './Components/register/register.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'register-comercio',
    component: RegisterComercioComponent,
  },
  {
    path: 'register-cliente',
    component: RegisterClienteComponent,
  },
  {
    path: 'buscador',
    component: BuscadorListComponent,
  },
  {
    path: 'comercio-cuenta',
    component: ComercioCuentaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'comercio-view',
    component: ComercioViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'horarios',
    component: HorarioListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'aperturas',
    component: AperturaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'productos',
    component: ProductoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mensajescomercio',
    component: MensajeComercioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cliente-cuenta',
    component: ClienteCuentaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cliente/:idCliente',
    component: ClienteFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'favoritos',
    component: FavoritoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mensajescliente',
    component: MensajeClienteComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
