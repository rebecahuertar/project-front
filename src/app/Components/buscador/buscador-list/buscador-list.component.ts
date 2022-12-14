import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';
import { BuscadorDTO } from '../../../Models/buscador.dto';
import { ComercioService } from '../../../Services/comercio.service';

@Component({
  selector: 'app-buscador-list',
  templateUrl: './buscador-list.component.html',
  styleUrls: ['./buscador-list.component.scss'],
})
export class BuscadorListComponent implements OnInit {
  showNoAuthSection: boolean;
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;

  dato: FormControl;
  resultados!: BuscadorDTO[];

  buscarForm: FormGroup;
  isValidForm: boolean | null;
  mensaje: string;
  responseOK: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private comercioService: ComercioService
  ) {
    this.showNoAuthSection = false;
    this.showAuthSectionCliente = true;
    this.showAuthSectionComercio = false;

    this.isValidForm = null;
    this.dato = new FormControl();

    this.mensaje = '';
    this.responseOK = false;

    this.dato = new FormControl(this.dato.value, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]);

    this.buscarForm = this.formBuilder.group({
      dato: this.dato,
    });
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
  }

  comercioview(idComercio: string): void {
    this.router.navigateByUrl('/comercio-view/' + idComercio);
  }

  buscador(): void {
    let errorResponse: any;
    this.isValidForm = false;
    this.resultados = [];

    if (this.buscarForm.invalid) {
      return;
    }

    this.isValidForm = true;

    this.comercioService.buscador(this.dato.value).subscribe({
      next: (resultados: BuscadorDTO[]) => {
        this.resultados = resultados;
        this.responseOK = true;
      },
      error: (error: HttpErrorResponse) => {
        this.responseOK = false;
        this.mensaje = error.error.message;
        errorResponse = error.error;
        //this.sharedService.errorLog(errorResponse);
      },
    });
  }
}
