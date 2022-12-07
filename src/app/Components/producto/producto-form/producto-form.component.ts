import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { ProductoDTO } from 'src/app/Models/producto.dto';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ProductoService } from 'src/app/Services/producto.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.scss'],
})
export class ProductoFormComponent implements OnInit {
  showNoAuthSection: boolean;
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;

  productoP: ProductoDTO;

  producto: FormControl;

  productoForm: FormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;

  private idProducto: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.showNoAuthSection = false;
    this.showAuthSectionCliente = true;
    this.showAuthSectionComercio = false;

    this.idProducto = this.activatedRoute.snapshot.paramMap.get('id');

    this.productoP = new ProductoDTO('', '', '');

    this.isUpdateMode = false;

    this.isValidForm = null;

    this.producto = new FormControl(this.productoP.producto, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);

    this.productoForm = this.formBuilder.group({
      producto: this.producto,
    });
  }

  ngOnInit(): void {
    let errorResponse: any;

    this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
          this.showNoAuthSection = headerInfo.showNoAuthSection;
          this.showAuthSectionCliente = headerInfo.showAuthSectionCliente;
          this.showAuthSectionComercio = headerInfo.showAuthSectionComercio;
        }
      }
    );

    if (this.idProducto) {
      this.isUpdateMode = true;
      this.productoService.getProductoById(this.idProducto).subscribe({
        next: (producto: ProductoDTO) => {
          this.productoP = producto;

          this.producto.setValue(this.productoP.producto);

          this.productoForm = this.formBuilder.group({
            producto: this.producto,
          });
        },
        error: (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        },
      });
    }
  }

  editProducto(): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    if (this.idProducto) {
      const userId = this.localStorageService.get('user_id');
      if (userId) {
        this.productoP.idComercio = userId;

        this.productoService
          .updateProducto(this.idProducto, this.productoP)
          .pipe(
            finalize(async () => {
              await this.sharedService.managementToast(
                'productoFeedback',
                responseOK,
                errorResponse
              );

              if (responseOK) {
                this.router.navigateByUrl('productos');
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

  createProducto(): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.productoP.idComercio = userId;

      this.productoService
        .createProducto(this.productoP)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'productoFeedback',
              responseOK,
              errorResponse
            );

            if (responseOK) {
              this.router.navigateByUrl('productos');
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
  saveProducto(): void {
    this.isValidForm = false;

    if (this.productoForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.productoP = this.productoForm.value;

    if (this.isUpdateMode) {
      this.editProducto();
    } else {
      this.createProducto();
    }
  }
}
