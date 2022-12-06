import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { HorarioDTO } from 'src/app/Models/horario.dto';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import {
  deleteResponse,
  HorarioService,
} from 'src/app/Services/horario.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario-list.component.html',
  styleUrls: ['./horario-list.component.scss'],
})
export class HorarioListComponent implements OnInit {
  horarios!: HorarioDTO[];
  showNoAuthSection: boolean;
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;
  constructor(
    private horarioService: HorarioService,
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

    this.loadHorarios();
  }

  private loadHorarios(): void {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.horarioService.getHorarios(userId).subscribe({
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

  crearHorario(): void {
    this.router.navigateByUrl('/horario/');
  }

  editHorario(id: string): void {
    this.router.navigateByUrl('/horario/' + id);
  }

  deleteHorario(id: string): void {
    let errorResponse: any;
    // show confirmation popup
    let result = confirm('Confirma eliminar este horario');
    if (result) {
      this.horarioService.deleteHorario(id).subscribe({
        next: (rowsAffected: deleteResponse) => {
          /*if (rowsAffected.affected > 0) {
            this.loadFavoritos();
          }*/

          this.loadHorarios();
        },
        error: (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        },
      });
    }
  }
}
