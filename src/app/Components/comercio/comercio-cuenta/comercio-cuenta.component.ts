import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComercioDTO } from 'src/app/Models/comercio.dto';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { ComercioService } from 'src/app/Services/comercio.service';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-comercio-cuenta',
  templateUrl: './comercio-cuenta.component.html',
  styleUrls: ['./comercio-cuenta.component.scss'],
})
export class ComercioCuentaComponent implements OnInit {
  comercio: ComercioDTO;
  showNoAuthSection: boolean;
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;

  constructor(
    private comercioService: ComercioService,
    private router: Router,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService
  ) {
    this.showNoAuthSection = false;
    this.showAuthSectionCliente = false;
    this.showAuthSectionComercio = true;

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
  }

  private loadComercio(): void {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.comercioService.getComercioById(userId).subscribe({
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

  updateComercio(idComercio?: string): void {
    this.router.navigateByUrl('/comercio/' + idComercio);
  }
}
