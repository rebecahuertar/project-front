import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { CategoriaDTO } from 'src/app/Models/categoria.dto';
import { ComercioDTO } from 'src/app/Models/comercio.dto';
import { MunicipioDTO } from 'src/app/Models/municipio.dto';
import { ProvinciaDTO } from 'src/app/Models/provincia.dto';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { ComercioService } from 'src/app/Services/comercio.service';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { MunicipioService } from 'src/app/Services/municipio.service';
import { ProvinciaService } from 'src/app/Services/provincia.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register-comercio.component.html',
  styleUrls: ['./register-comercio.component.scss'],
})
export class RegisterComercioComponent implements OnInit {
  provincias!: ProvinciaDTO[];
  municipios!: MunicipioDTO[];
  categorias!: CategoriaDTO[];
  registerComercio: ComercioDTO;

  nombre: FormControl;
  apellidos: FormControl;
  email: FormControl;
  password: FormControl;
  nombreComercio: FormControl;
  categoria: FormControl;
  descripcion: FormControl;
  direccion: FormControl;
  provincia: FormControl;
  municipio: FormControl;
  codigopostal: FormControl;
  web: FormControl;
  telefono: FormControl;

  registerForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private comercioService: ComercioService,
    private categoriaService: CategoriaService,
    private provinciaService: ProvinciaService,
    private municipioService: MunicipioService,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private router: Router
  ) {
    this.loadProvincias();
    this.loadMunicipios('3');
    this.loadCategorias();

    this.registerComercio = new ComercioDTO(
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
      '628',
      '',
      '3',
      '',
      '',
      '',
      ''
    );

    this.isValidForm = null;

    this.nombre = new FormControl(this.registerComercio.nombre, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15),
    ]);

    this.apellidos = new FormControl(this.registerComercio.apellidos, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.email = new FormControl(this.registerComercio.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.registerComercio.password, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
    ]);

    this.nombreComercio = new FormControl(
      this.registerComercio.nombreComercio,
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    );

    this.descripcion = new FormControl(this.registerComercio.descripcion, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(80),
    ]);

    this.direccion = new FormControl(this.registerComercio.direccion, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(40),
    ]);

    this.categoria = new FormControl(this.registerComercio.idCategoria, [
      Validators.required,
    ]);

    this.provincia = new FormControl(this.registerComercio.idProvincia, [
      Validators.required,
    ]);

    this.municipio = new FormControl(this.registerComercio.idMunicipio, [
      Validators.required,
    ]);

    this.codigopostal = new FormControl(this.registerComercio.codigopostal, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(6),
    ]);

    this.web = new FormControl(this.registerComercio.web, [
      //Validators.required,
    ]);

    this.telefono = new FormControl(this.registerComercio.telefono, [
      //Validators.required,
    ]);

    this.registerForm = this.formBuilder.group({
      nombre: this.nombre,
      apellidos: this.apellidos,
      email: this.email,
      password: this.password,
      nombreComercio: this.nombreComercio,
      descripcion: this.descripcion,
      direccion: this.direccion,
      categoria: this.categoria,
      idprovincia: this.provincia,
      idmunicipio: this.municipio,
      codigopostal: this.codigopostal,
      web: this.web,
      telefono: this.telefono,
    });

    this.registerForm.controls['idprovincia'].valueChanges.subscribe(
      (value) => {
        this.loadMunicipios(value);
      }
    );
  }

  ngOnInit(): void {}

  private loadProvincias(): void {
    let errorResponse: any;
    this.provinciaService.getProvincias().subscribe({
      next: (provincias: ProvinciaDTO[]) => {
        this.provincias = provincias;
      },
      error: (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      },
    });
  }

  private loadMunicipios(idProvincia: string): void {
    let errorResponse: any;
    this.municipioService.getMunicipios(idProvincia).subscribe({
      next: (municipios: MunicipioDTO[]) => {
        this.municipios = municipios;
      },
      error: (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      },
    });
  }

  private loadCategorias(): void {
    let errorResponse: any;
    this.categoriaService.getCategorias().subscribe({
      next: (categorias: CategoriaDTO[]) => {
        this.categorias = categorias;
      },
      error: (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      },
    });
  }

  register(): void {
    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;

    if (this.registerForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.registerComercio = {
      nombre: this.nombre.value,
      apellidos: this.apellidos.value,
      email: this.email.value,
      password: this.password.value,
      tipoUsuario: 'comercio',
      activo: 'SI',
      nombreComercio: this.nombreComercio.value,
      descripcion: this.descripcion.value,
      direccion: this.direccion.value,
      idCategoria: this.categoria.value,
      categoria: '',
      idMunicipio: this.municipio.value,
      municipio: '',
      idProvincia: this.provincia.value,
      provincia: '',
      codigopostal: this.codigopostal.value,
      web: this.web.value,
      telefono: this.telefono.value,
    };

    this.comercioService
      .registerComercio(this.registerComercio)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'registerFeedback',
            responseOK,
            errorResponse
          );

          if (responseOK) {
            this.router.navigateByUrl('login');
          }
        })
      )
      .subscribe({
        next: () => {
          responseOK = true;
        },
        error: (error: HttpErrorResponse) => {
          responseOK = false;
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        },
      });
  }
}
