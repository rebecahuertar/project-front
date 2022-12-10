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
  favorito!: FavoritoDTO;
  mensajes!: MensajeClienteDTO[];
  showNoAuthSection: boolean;
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;

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
          this.sharedService.errorLog(errorResponse);
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
              this.loadMensajesFavoritos();
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
}
