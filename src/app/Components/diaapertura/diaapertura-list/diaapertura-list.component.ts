import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiaaperturaDTO } from 'src/app/Models/diaapertura.dto';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import {
  deleteResponse,
  DiaaperturaService,
} from 'src/app/Services/diaapertura.service';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-diaapertura-list',
  templateUrl: './diaapertura-list.component.html',
  styleUrls: ['./diaapertura-list.component.scss'],
})
export class DiaaperturaListComponent implements OnInit {
  dias!: DiaaperturaDTO[];
  showNoAuthSection: boolean;
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;
  constructor(
    private diaaperturaService: DiaaperturaService,
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

    this.loadDias();
  }

  private loadDias(): void {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.diaaperturaService.getDias(userId).subscribe({
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

  crearDia(): void {
    this.router.navigateByUrl('/apertura/');
  }

  editDia(id: string): void {
    this.router.navigateByUrl('/apertura/' + id);
  }

  deleteDia(id: string): void {
    let errorResponse: any;
    // show confirmation popup
    let result = confirm('Confirma eliminar este dia');
    if (result) {
      this.diaaperturaService.deleteDia(id).subscribe({
        next: (rowsAffected: deleteResponse) => {
          /*if (rowsAffected.affected > 0) {
            this.loadFavoritos();
          }*/

          this.loadDias();
        },
        error: (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        },
      });
    }
  }
}
