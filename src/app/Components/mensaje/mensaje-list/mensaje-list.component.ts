import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { MensajeDTO } from 'src/app/Models/mensaje.dto';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import {
  deleteResponse,
  MensajeService,
} from 'src/app/Services/mensaje.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-mensaje-list',
  templateUrl: './mensaje-list.component.html',
  styleUrls: ['./mensaje-list.component.scss'],
})
export class MensajeListComponent implements OnInit {
  mensajes!: MensajeDTO[];
  showNoAuthSection: boolean;
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;
  constructor(
    private mensajeService: MensajeService,
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

    this.loadMensajes();
  }

  private loadMensajes(): void {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.mensajeService.getMensajes(userId).subscribe({
        next: (mensajes: MensajeDTO[]) => {
          this.mensajes = mensajes;
        },
        error: (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        },
      });
    }
  }

  crearMensaje(): void {
    this.router.navigateByUrl('/mensaje/');
  }

  editMensaje(id: string): void {
    this.router.navigateByUrl('/mensaje/' + id);
  }

  deleteMensaje(id: string): void {
    let errorResponse: any;
    // show confirmation popup
    let result = confirm('¿Confirma eliminar este mensaje?');
    if (result) {
      this.mensajeService.deleteMensaje(id).subscribe({
        next: (rowsAffected: deleteResponse) => {
          /*if (rowsAffected.affected > 0) {
            this.loadFavoritos();
          }*/

          this.loadMensajes();
        },
        error: (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        },
      });
    }
  }
}
