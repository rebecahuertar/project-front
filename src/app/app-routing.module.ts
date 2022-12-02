import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorListComponent } from './Components/buscador/buscador-list/buscador-list.component';
import { ClienteCuentaComponent } from './Components/cliente/cliente-cuenta/cliente-cuenta.component';
import { ComercioCuentaComponent } from './Components/comercio/comercio-cuenta/comercio-cuenta.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
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
    path: 'cliente-cuenta',
    component: ClienteCuentaComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
