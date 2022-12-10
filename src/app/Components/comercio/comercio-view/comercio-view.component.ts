import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComercioDTO } from 'src/app/Models/comercio.dto';
import { DiaaperturaDTO } from 'src/app/Models/diaapertura.dto';
import { FavoritoDTO } from 'src/app/Models/favorito.dto';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { HorarioDTO } from 'src/app/Models/horario.dto';
import { MensajeDTO } from 'src/app/Models/mensaje.dto';
import { ProductoDTO } from 'src/app/Models/producto.dto';
import { ComercioService } from 'src/app/Services/comercio.service';
import { DiaaperturaService } from 'src/app/Services/diaapertura.service';
import {
  deleteResponse,
  FavoritoService,
} from 'src/app/Services/favorito.service';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { HorarioService } from 'src/app/Services/horario.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { MensajeService } from 'src/app/Services/mensaje.service';
import { ProductoService } from 'src/app/Services/producto.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-comercio-view',
  templateUrl: './comercio-view.component.html',
  styleUrls: ['./comercio-view.component.scss'],
})
export class ComercioViewComponent implements OnInit {
  comercio: ComercioDTO;
  horarios!: HorarioDTO[];
  dias!: DiaaperturaDTO[];
  productos!: ProductoDTO[];
  mensajes!: MensajeDTO[];
  favorito: FavoritoDTO;
  showNoAuthSection: boolean;
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;

  private idComercio: string | null;
  private idCliente: string | null;
  esfavorito!: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private comercioService: ComercioService,
    private horarioService: HorarioService,
    private favoritoService: FavoritoService,
    private diaaperturaService: DiaaperturaService,
    private productoService: ProductoService,
    private mensajeService: MensajeService,
    private router: Router,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService
  ) {
    this.showNoAuthSection = false;
    this.showAuthSectionCliente = false;
    this.showAuthSectionComercio = true;

    this.idComercio = this.activatedRoute.snapshot.paramMap.get('idComercio');
    this.idCliente = this.localStorageService.get('user_id');
    this.comercio = new ComercioDTO(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );
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
    this.loadComercio();
    this.comprobarFavorito();
    this.loadHorariosVisibles();
    this.loadDiasAperturaVisibles();
    this.loadProductos();
    this.loadMensajes();
  }

  private loadComercio(): void {
    let errorResponse: any;
    // const userId = this.localStorageService.get('user_id');
    if (this.idCliente) {
      if (this.idComercio) {
        this.comercioService.getComercioById(this.idComercio).subscribe({
          next: (comercio: ComercioDTO) => {
            this.comercio = comercio;
          },
          error: (error: HttpErrorResponse) => {
            errorResponse = error.error;
            this.sharedService.errorLog(errorResponse);
          },
        });
      }
    }
  }
  //comprobar si este comercio lo tenemos como favorito
  comprobarFavorito(): void {
    let errorResponse: any;
    this.idComercio;
    //const idCliente = this.localStorageService.get('user_id');
    if (this.idCliente) {
      if (this.idComercio) {
        this.favoritoService
          .comprobarFavorito(this.idCliente, this.idComercio)
          .subscribe({
            next: (favorito: boolean) => {
              this.esfavorito = favorito;
            },
            error: (error: HttpErrorResponse) => {
              errorResponse = error.error;
              this.sharedService.errorLog(errorResponse);
            },
          });
      }
    }
  }
  //mostrar horarios solo los que estan visibles por el Comercio.
  private loadHorariosVisibles(): void {
    let errorResponse: any;
    //const userId = this.localStorageService.get('user_id');
    if (this.idCliente) {
      if (this.idComercio) {
        this.horarioService.getHorariosVisibles(this.idComercio).subscribe({
          next: (horarios: HorarioDTO[]) => {
            this.horarios = horarios;
          },
          error: (error: HttpErrorResponse) => {
            errorResponse = error.error;
            this.sharedService.errorLog(errorResponse);
          },
        });
      }
    }
  }

  //mostrar dias de apertura solo los que estan visibles por el Comercio.
  private loadDiasAperturaVisibles(): void {
    let errorResponse: any;
    // const userId = this.localStorageService.get('user_id');
    if (this.idCliente) {
      if (this.idComercio) {
        this.diaaperturaService.getDiasVisibles(this.idComercio).subscribe({
          next: (dias: DiaaperturaDTO[]) => {
            this.dias = dias;
          },
          error: (error: HttpErrorResponse) => {
            errorResponse = error.error;
            this.sharedService.errorLog(errorResponse);
          },
        });
      }
    }
  }

  private loadProductos(): void {
    let errorResponse: any;
    // const userId = this.localStorageService.get('user_id');
    if (this.idCliente) {
      if (this.idComercio) {
        this.productoService.getProductos(this.idComercio).subscribe({
          next: (productos: ProductoDTO[]) => {
            this.productos = productos;
          },
          error: (error: HttpErrorResponse) => {
            errorResponse = error.error;
            this.sharedService.errorLog(errorResponse);
          },
        });
      }
    }
  }

  private loadMensajes(): void {
    let errorResponse: any;
    //const userId = this.localStorageService.get('user_id');
    if (this.idCliente) {
      if (this.idComercio) {
        this.mensajeService.getMensajesVisibles(this.idComercio).subscribe({
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
  }

  deleteFavorito(nombreComercio: string): void {
    let errorResponse: any;
    // show confirmation popup
    let result = confirm(
      '¿Confirma eliminar este comercio ' + nombreComercio + ' como favorito?'
    );
    if (result) {
      // const idCliente = this.localStorageService.get('user_id');
      if (this.idCliente) {
        if (this.idComercio) {
          this.favoritoService
            .deleteFavorito(this.idCliente, this.idComercio)
            .subscribe({
              next: (rowsAffected: deleteResponse) => {
                this.ngOnInit();
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

  anyadeFavorito(nombreComercio: string): void {
    let errorResponse: any;
    // show confirmation popup
    let result = confirm(
      '¿Confirma añadir este comercio ' + nombreComercio + ' como favorito?'
    );
    if (result) {
      if (this.idCliente) {
        if (this.idComercio) {
          this.favorito.idCliente = this.idCliente;
          this.favorito.idComercio = this.idComercio;
          this.favorito.verMensajes = 'SI';
          this.favoritoService.anyadeFavorito(this.favorito).subscribe({
            next: () => {
              this.ngOnInit();
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
}
