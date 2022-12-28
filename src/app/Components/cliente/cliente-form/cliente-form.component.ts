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
import { ClienteDTO } from 'src/app/Models/cliente.dto';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { MunicipioDTO } from 'src/app/Models/municipio.dto';
import { ProvinciaDTO } from 'src/app/Models/provincia.dto';
import { ClienteService } from 'src/app/Services/cliente.service';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { MunicipioService } from 'src/app/Services/municipio.service';
import { ProvinciaService } from 'src/app/Services/provincia.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
})
export class ClienteFormComponent implements OnInit {
  showNoAuthSection: boolean;
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;

  provincias!: ProvinciaDTO[];
  municipios!: MunicipioDTO[];
  cliente: ClienteDTO;

  nombre: FormControl;
  apellidos: FormControl;
  email: FormControl;
  password: FormControl;
  provincia: FormControl;
  municipio: FormControl;
  codigopostal: FormControl;

  clienteForm: FormGroup;
  isValidForm: boolean | null;

  private idCliente: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
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
    this.idCliente = this.activatedRoute.snapshot.paramMap.get('idCliente');
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

    this.isValidForm = null;

    this.nombre = new FormControl(this.cliente.nombre, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]);

    this.apellidos = new FormControl(this.cliente.apellidos, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.email = new FormControl(this.cliente.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.cliente.password, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
    ]);

    this.provincia = new FormControl(this.cliente.idProvincia, [
      Validators.required,
    ]);

    this.municipio = new FormControl(this.cliente.idMunicipio, [
      Validators.required,
    ]);

    this.codigopostal = new FormControl(this.cliente.codigopostal, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(6),
    ]);

    this.clienteForm = this.formBuilder.group({
      nombre: this.nombre,
      apellidos: this.apellidos,
      email: this.email,
      password: this.password,
      idProvincia: this.provincia,
      idMunicipio: this.municipio,
      codigopostal: this.codigopostal,
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

    if (this.idCliente) {
      this.clienteService.getClienteById(this.idCliente).subscribe({
        next: (cliente: ClienteDTO) => {
          this.cliente = cliente;

          this.email.setValue(this.cliente.email);
          //this.password.setValue(this.cliente.password);
          this.nombre.setValue(this.cliente.nombre);
          this.apellidos.setValue(this.cliente.apellidos);
          this.provincia.setValue(this.cliente.idProvincia);
          this.municipio.setValue(this.cliente.idMunicipio);
          this.codigopostal.setValue(this.cliente.codigopostal);

          this.clienteForm = this.formBuilder.group({
            email: this.email,
            password: this.password,
            nombre: this.nombre,
            apellidos: this.apellidos,
            idMunicipio: this.municipio,
            idProvincia: this.provincia,
            codigopostal: this.codigopostal,
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

  guardarCliente(): void {
    let errorResponse: any;
    let responseOK: boolean = false;

    this.isValidForm = false;

    if (this.clienteForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.cliente = this.clienteForm.value;

    if (this.idCliente) {
      const userId = this.localStorageService.get('user_id');
      if (userId) {
        this.cliente.idCliente = userId;

        this.clienteService
          .updateCliente(this.idCliente, this.cliente)
          .pipe(
            finalize(async () => {
              await this.sharedService.managementToast(
                'clienteFeedback',
                responseOK,
                errorResponse
              );

              if (responseOK) {
                this.router.navigateByUrl('cliente-cuenta');
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

  volver(): void {
    this.router.navigateByUrl('cliente-cuenta');
  }

  home(): void {
    this.router.navigateByUrl('home');
  }
}
