import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;
  showNoAuthSection: boolean;

  constructor(
    private router: Router,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService
  ) {
    this.showNoAuthSection = true;
    this.showAuthSectionCliente = false;
    this.showAuthSectionComercio = false;
  }

  ngOnInit(): void {
    this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
          this.showNoAuthSection = headerInfo.showNoAuthSection;
          this.showAuthSectionCliente = headerInfo.showAuthSectionCliente;
          this.showAuthSectionComercio = headerInfo.showAuthSectionComercio;
        }
      }
    );
  }

  home(): void {
    this.router.navigateByUrl('home');
  }

  login(): void {
    this.router.navigateByUrl('login');
  }

  register(): void {
    this.router.navigateByUrl('register');
  }

  buscador(): void {
    this.router.navigateByUrl('buscador');
  }

  cuenta(): void {
    const tipo_usuario = this.localStorageService.get('tipo_usuario');
    if (tipo_usuario == 'comercio') {
      this.router.navigateByUrl('comercio-cuenta');
    } else {
      this.router.navigateByUrl('cliente-cuenta');
    }
  }
  horarios(): void {
    this.router.navigateByUrl('horarios');
  }

  aperturas(): void {
    this.router.navigateByUrl('aperturas');
  }

  productos(): void {
    this.router.navigateByUrl('productos');
  }

  mensajes(): void {
    this.router.navigateByUrl('mensajes');
  }

  favoritos(): void {
    this.router.navigateByUrl('favoritos');
  }

  mensajescliente(): void {
    this.router.navigateByUrl('mensajescliente');
  }

  logout(): void {
    this.localStorageService.remove('user_id');
    this.localStorageService.remove('tipo_usuario');
    this.localStorageService.remove('access_token');

    const headerInfo: HeaderMenus = {
      showNoAuthSection: true,
      showAuthSectionCliente: false,
      showAuthSectionComercio: false,
    };

    this.headerMenusService.headerManagement.next(headerInfo);

    this.router.navigateByUrl('home');
  }
}
