import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritoDTO } from 'src/app/Models/favorito.dto';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import {
  deleteResponse,
  FavoritoService,
} from 'src/app/Services/favorito.service';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favorito.component.html',
  styleUrls: ['./favorito.component.scss'],
})
export class FavoritoComponent implements OnInit {
  favoritos!: FavoritoDTO[];
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

    this.loadFavoritos();
  }

  private loadFavoritos(): void {
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

  comercioview(idComercio: string): void {
    this.router.navigateByUrl('/comercio-view/' + idComercio);
  }

  deleteFavorito(idComercio: string, nombreComercio: string): void {
    let errorResponse: any;
    // show confirmation popup
    let result = confirm(
      '¿Confirma eliminar este comercio ' + nombreComercio + ' como favorito?'
    );
    if (result) {
      const idCliente = this.localStorageService.get('user_id');
      if (idCliente) {
        this.favoritoService.deleteFavorito(idCliente, idComercio).subscribe({
          next: (rowsAffected: deleteResponse) => {
            /*if (rowsAffected.affected > 0) {
                this.loadFavoritos();
              }*/

            this.loadFavoritos();
          },
          error: (error: HttpErrorResponse) => {
            errorResponse = error.error;
            this.sharedService.errorLog(errorResponse);
          },
        });
      }
    }
  }
}
