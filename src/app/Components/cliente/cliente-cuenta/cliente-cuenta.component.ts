import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteDTO } from 'src/app/Models/cliente.dto';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { ClienteService } from 'src/app/Services/cliente.service';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-cliente-cuenta',
  templateUrl: './cliente-cuenta.component.html',
  styleUrls: ['./cliente-cuenta.component.scss'],
})
export class ClienteCuentaComponent implements OnInit {
  cliente: ClienteDTO;
  showNoAuthSection: boolean;
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService
  ) {
    this.showNoAuthSection = false;
    this.showAuthSectionCliente = true;
    this.showAuthSectionComercio = false;

    this.cliente = new ClienteDTO(
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

    this.loadCliente();
  }

  private loadCliente(): void {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.clienteService.getClienteById(userId).subscribe({
        next: (cliente: ClienteDTO) => {
          this.cliente = cliente;
        },
        error: (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        },
      });
    }
  }

  updateCliente(idCliente?: string): void {
    this.router.navigateByUrl('/cliente/' + idCliente);
  }

  home(): void {
    this.router.navigateByUrl('home');
  }
}
