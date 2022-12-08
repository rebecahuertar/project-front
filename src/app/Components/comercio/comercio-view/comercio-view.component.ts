import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComercioDTO } from 'src/app/Models/comercio.dto';
import { DiaaperturaDTO } from 'src/app/Models/diaapertura.dto';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { HorarioDTO } from 'src/app/Models/horario.dto';
import { MensajeDTO } from 'src/app/Models/mensaje.dto';
import { ProductoDTO } from 'src/app/Models/producto.dto';
import { ComercioService } from 'src/app/Services/comercio.service';
import { DiaaperturaService } from 'src/app/Services/diaapertura.service';
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
  showNoAuthSection: boolean;
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;

  private idComercio: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private comercioService: ComercioService,
    private horarioService: HorarioService,
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
    this.loadHorariosVisibles();
    this.loadDiasAperturaVisibles();
    this.loadProductos();
    this.loadMensajes();
  }

  private loadComercio(): void {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
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
  //mostrar horarios solo los que estan visibles por el Comercio.
  private loadHorariosVisibles(): void {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
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
    const userId = this.localStorageService.get('user_id');
    if (userId) {
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
    const userId = this.localStorageService.get('user_id');
    if (userId) {
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
    const userId = this.localStorageService.get('user_id');
    if (userId) {
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
}
