import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';

import { ProductoDTO } from 'src/app/Models/producto.dto';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';

import { LocalStorageService } from 'src/app/Services/local-storage.service';
import {
  deleteResponse,
  ProductoService,
} from 'src/app/Services/producto.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss'],
})
export class ProductoListComponent implements OnInit {
  productos!: ProductoDTO[];
  showNoAuthSection: boolean;
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;
  constructor(
    private productoService: ProductoService,
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

    this.loadProductos();
  }

  private loadProductos(): void {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.productoService.getProductos(userId).subscribe({
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

  crearProducto(): void {
    this.router.navigateByUrl('/producto/');
  }

  editProducto(id: string): void {
    this.router.navigateByUrl('/producto/' + id);
  }

  deleteProducto(id: string): void {
    let errorResponse: any;
    // show confirmation popup
    let result = confirm('¿Confirma eliminar este producto?');
    if (result) {
      this.productoService.deleteProducto(id).subscribe({
        next: (rowsAffected: deleteResponse) => {
          /*if (rowsAffected.affected > 0) {
            this.loadFavoritos();
          }*/

          this.loadProductos();
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
