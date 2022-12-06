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
import { CategoriaDTO } from 'src/app/Models/categoria.dto';
import { ComercioDTO } from 'src/app/Models/comercio.dto';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { MunicipioDTO } from 'src/app/Models/municipio.dto';
import { ProvinciaDTO } from 'src/app/Models/provincia.dto';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { ComercioService } from 'src/app/Services/comercio.service';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { MunicipioService } from 'src/app/Services/municipio.service';
import { ProvinciaService } from 'src/app/Services/provincia.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-comercio-form',
  templateUrl: './comercio-form.component.html',
  styleUrls: ['./comercio-form.component.scss'],
})
export class ComercioFormComponent implements OnInit {
  showNoAuthSection: boolean;
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;

  provincias!: ProvinciaDTO[];
  municipios!: MunicipioDTO[];
  categorias!: CategoriaDTO[];
  comercio: ComercioDTO;

  nombre: FormControl;
  apellidos: FormControl;
  email: FormControl;
  password: FormControl;
  nombreComercio: FormControl;
  descripcion: FormControl;
  direccion: FormControl;
  categoria: FormControl;
  provincia: FormControl;
  municipio: FormControl;
  codigopostal: FormControl;
  web: FormControl;
  telefono: FormControl;

  comercioForm: FormGroup;
  isValidForm: boolean | null;

  private idComercio: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private comercioService: ComercioService,
    private categoriaService: CategoriaService,
    private provinciaService: ProvinciaService,
    private municipioService: MunicipioService,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.showNoAuthSection = false;
    this.showAuthSectionCliente = true;
    this.showAuthSectionComercio = false;

    this.loadProvincias();
    this.loadMunicipios('3');
    this.loadCategorias();
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
    this.isValidForm = null;
    this.nombre = new FormControl(this.comercio.nombre, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15),
    ]);

    this.apellidos = new FormControl(this.comercio.apellidos, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.email = new FormControl(this.comercio.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.comercio.password, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
    ]);

    this.nombreComercio = new FormControl(this.comercio.nombreComercio, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]);

    this.descripcion = new FormControl(this.comercio.descripcion, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(80),
    ]);

    this.direccion = new FormControl(this.comercio.direccion, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(40),
    ]);

    this.categoria = new FormControl(this.comercio.idCategoria, [
      Validators.required,
    ]);

    this.provincia = new FormControl(this.comercio.idProvincia, [
      Validators.required,
    ]);

    this.municipio = new FormControl(this.comercio.idMunicipio, [
      Validators.required,
    ]);

    this.codigopostal = new FormControl(this.comercio.codigopostal, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(6),
    ]);

    this.web = new FormControl(this.comercio.web, [
      //Validators.required,
    ]);

    this.telefono = new FormControl(this.comercio.telefono, [
      //Validators.required,
    ]);

    this.comercioForm = this.formBuilder.group({
      nombre: this.nombre,
      apellidos: this.apellidos,
      email: this.email,
      password: this.password,
      nombreComercio: this.nombreComercio,
      descripcion: this.descripcion,
      direccion: this.direccion,
      categoria: this.categoria,
      provincia: this.provincia,
      municipio: this.municipio,
      codigopostal: this.codigopostal,
      web: this.web,
      telefono: this.telefono,
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

    if (this.idComercio) {
      this.comercioService.getComercioById(this.idComercio).subscribe({
        next: (comercio: ComercioDTO) => {
          this.comercio = comercio;

          this.nombre.setValue(this.comercio.nombre);
          this.apellidos.setValue(this.comercio.apellidos);
          this.email.setValue(this.comercio.email);
          // this.password.setValue(this.comercio.password);
          this.nombreComercio.setValue(this.comercio.nombreComercio);
          this.descripcion.setValue(this.comercio.descripcion);
          this.direccion.setValue(this.comercio.direccion);
          this.categoria.setValue(this.comercio.idCategoria);
          this.provincia.setValue(this.comercio.idProvincia);
          this.municipio.setValue(this.comercio.idMunicipio);
          this.codigopostal.setValue(this.comercio.codigopostal);
          this.web.setValue(this.comercio.web);
          this.telefono.setValue(this.comercio.telefono);

          this.comercioForm = this.formBuilder.group({
            email: this.email,
            password: this.password,
            nombre: this.nombre,
            apellidos: this.apellidos,
            nombreComercio: this.nombreComercio,
            descripcion: this.descripcion,
            direccion: this.direccion,
            idCategoria: this.categoria,
            idMunicipio: this.municipio,
            idProvincia: this.provincia,
            codigopostal: this.codigopostal,
            web: this.web,
            telefono: this.telefono,
          });
        },
        error: (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        },
      });
    }
  }

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

  guardarComercio(): void {
    let errorResponse: any;
    let responseOK: boolean = false;

    this.isValidForm = false;

    if (this.comercioForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.comercio = this.comercioForm.value;

    if (this.idComercio) {
      const userId = this.localStorageService.get('user_id');
      if (userId) {
        this.comercio.idComercio = userId;

        this.comercioService
          .updateComercio(this.idComercio, this.comercio)
          .pipe(
            finalize(async () => {
              await this.sharedService.managementToast(
                'comercioFeedback',
                responseOK,
                errorResponse
              );

              if (responseOK) {
                this.router.navigateByUrl('comercio-cuenta');
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
}
