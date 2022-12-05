import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FavoritoDTO } from 'src/app/Models/favorito.dto';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { MensajeDTO } from 'src/app/Models/mensaje.dto';
import { ClienteService } from 'src/app/Services/cliente.service';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensaje-cliente.component.html',
  styleUrls: ['./mensaje-cliente.component.scss'],
})
export class MensajeClienteComponent implements OnInit {
  favoritos!: FavoritoDTO[];
  nensajes!: MensajeDTO[];
  showNoAuthSection: boolean;
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;

  constructor(
    private clienteService: ClienteService,
    private comercioService: ClienteService,
    private router: Router,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService
  ) {
    this.showNoAuthSection = false;
    this.showAuthSectionCliente = true;
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

    this.loadMensajesFavoritos();
  }

  private loadMensajesFavoritos(): void {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.clienteService.getClienteFavoritos(userId).subscribe({
        next: (favoritos: FavoritoDTO[]) => {
          this.favoritos = favoritos;
        },
        error: (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        },
      });
    }
  }
}
