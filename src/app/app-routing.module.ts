import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorListComponent } from './Components/buscador/buscador-list/buscador-list.component';
import { ClienteCuentaComponent } from './Components/cliente/cliente-cuenta/cliente-cuenta.component';
import { ClienteFormComponent } from './Components/cliente/cliente-form/cliente-form.component';
import { ComercioCuentaComponent } from './Components/comercio/comercio-cuenta/comercio-cuenta.component';
import { ComercioFormComponent } from './Components/comercio/comercio-form/comercio-form.component';
import { ComercioViewComponent } from './Components/comercio/comercio-view/comercio-view.component';
import { DiaaperturaFormComponent } from './Components/diaapertura/diaapertura-form/diaapertura-form.component';
import { DiaaperturaListComponent } from './Components/diaapertura/diaapertura-list/diaapertura-list.component';
import { FavoritoComponent } from './Components/favorito/favorito.component';
import { HomeComponent } from './Components/home/home.component';
import { HorarioFormComponent } from './Components/horario/horario-form/horario-form.component';
import { HorarioListComponent } from './Components/horario/horario-list/horario-list.component';
import { LoginComponent } from './Components/login/login.component';
import { MensajeClienteComponent } from './Components/mensaje/mensaje-cliente/mensaje-cliente.component';
import { MensajeFormComponent } from './Components/mensaje/mensaje-form/mensaje-form.component';
import { MensajeListComponent } from './Components/mensaje/mensaje-list/mensaje-list.component';
import { ProductoFormComponent } from './Components/producto/producto-form/producto-form.component';
import { ProductoListComponent } from './Components/producto/producto-list/producto-list.component';
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
    path: 'comercio/:idComercio',
    component: ComercioFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'comercio-view/:idComercio',
    component: ComercioViewComponent,
  },
  {
    path: 'horarios',
    component: HorarioListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'horario/:id',
    component: HorarioFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'aperturas',
    component: DiaaperturaListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'apertura/:id',
    component: DiaaperturaFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'productos',
    component: ProductoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'producto/:id',
    component: ProductoFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mensajes',
    component: MensajeListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mensaje/:id',
    component: MensajeFormComponent,
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
