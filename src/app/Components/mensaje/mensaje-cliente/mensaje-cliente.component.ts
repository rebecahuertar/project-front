import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { FavoritoDTO } from 'src/app/Models/favorito.dto';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { MensajeClienteDTO } from 'src/app/Models/mensajecliente.dto';
import { FavoritoService } from 'src/app/Services/favorito.service';
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
  favorito!: FavoritoDTO;
  mensajes!: MensajeClienteDTO[];
  showNoAuthSection: boolean;
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;

  nomensajes: string;

  constructor(
    private favoritoService: FavoritoService,
    private router: Router,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService
  ) {
    this.showNoAuthSection = false;
    this.showAuthSectionCliente = true;
    this.showAuthSectionComercio = false;
    this.favorito = new FavoritoDTO('', '', '', '', '');
    this.nomensajes = '';
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
    this.loadNoMensajesFavoritos();
  }

  comercioview(idComercio: string): void {
    this.router.navigateByUrl('/comercio-view/' + idComercio);
  }

  private loadMensajesFavoritos(): void {
    let errorResponse: any;
    let fecha: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.favoritoService.getClienteMensajesFavoritos(userId).subscribe({
        next: (mensajes: MensajeClienteDTO[]) => {
          this.mensajes = mensajes;
        },
        error: (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.mensajes = [];
          this.nomensajes = errorResponse.message;
          //this.sharedService.errorLog(errorResponse);
        },
      });
    }
  }

  noVerMensajes(idFavorito: string, nombreComercio: string): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    let result = confirm(
      '¿Desea dejar de ver los mensajes del comercio ' + nombreComercio + '?'
    );
    if (result) {
      this.favorito.verMensajes = 'NO';
      this.favoritoService
        .updateVerMensaje(idFavorito, this.favorito)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'mensajeCFeedback',
              responseOK,
              errorResponse
            );

            if (responseOK) {
              this.nomensajes = '';
              this.loadMensajesFavoritos();
              this.loadNoMensajesFavoritos();
            }
          })
        )
        .subscribe({
          next: () => {
            responseOK = true;
          },
          error: (error: HttpErrorResponse) => {
            errorResponse = error.error;
            this.sharedService.errorLog(errorResponse);
          },
        });
    }
  }

  siVerMensajes(idFavorito: string, nombreComercio: string): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    let result = confirm(
      '¿Desea ver los mensajes del comercio ' + nombreComercio + '?'
    );
    if (result) {
      this.favorito.verMensajes = 'SI';
      this.favoritoService
        .updateVerMensaje(idFavorito, this.favorito)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'mensajeCFeedback',
              responseOK,
              errorResponse
            );

            if (responseOK) {
              this.nomensajes = '';
              this.loadMensajesFavoritos();
              this.loadNoMensajesFavoritos();
            }
          })
        )
        .subscribe({
          next: () => {
            responseOK = true;
          },
          error: (error: HttpErrorResponse) => {
            errorResponse = error.error;
            this.sharedService.errorLog(errorResponse);
          },
        });
    }
  }
  //listado de favoritos que no tenemos visibles los mensajes
  //para poder activarlos otra vez.
  private loadNoMensajesFavoritos(): void {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.favoritoService.getClienteFavoritos(userId).subscribe({
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

  home(): void {
    this.router.navigateByUrl('home');
  }
}
