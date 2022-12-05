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

import { ClienteDTO } from 'src/app/Models/cliente.dto';
import { MunicipioDTO } from 'src/app/Models/municipio.dto';
import { ProvinciaDTO } from 'src/app/Models/provincia.dto';
import { ClienteService } from 'src/app/Services/cliente.service';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { MunicipioService } from 'src/app/Services/municipio.service';
import { ProvinciaService } from 'src/app/Services/provincia.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register-cliente.component.html',
  styleUrls: ['./register-cliente.component.scss'],
})
export class RegisterClienteComponent implements OnInit {
  provincias!: ProvinciaDTO[];
  municipios!: MunicipioDTO[];
  registerCliente: ClienteDTO;

  nombre: FormControl;
  apellidos: FormControl;
  email: FormControl;
  password: FormControl;
  provincia: FormControl;
  municipio: FormControl;
  codigopostal: FormControl;

  registerForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private provinciaService: ProvinciaService,
    private municipioService: MunicipioService,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private router: Router
  ) {
    this.loadProvincias();
    this.loadMunicipios('3');

    this.registerCliente = new ClienteDTO(
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

    this.nombre = new FormControl(this.registerCliente.nombre, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]);

    this.apellidos = new FormControl(this.registerCliente.apellidos, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.email = new FormControl(this.registerCliente.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.registerCliente.password, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
    ]);

    this.provincia = new FormControl(this.registerCliente.idProvincia, [
      Validators.required,
    ]);

    this.municipio = new FormControl(this.registerCliente.idMunicipio, [
      Validators.required,
    ]);

    this.codigopostal = new FormControl(this.registerCliente.codigopostal, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(6),
    ]);

    this.registerForm = this.formBuilder.group({
      nombre: this.nombre,
      apellidos: this.apellidos,
      email: this.email,
      password: this.password,
      idprovincia: this.provincia,
      idmunicipio: this.municipio,
      codigopostal: this.codigopostal,
    });
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

  register(): void {
    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;

    if (this.registerForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.registerCliente = {
      nombre: this.nombre.value,
      apellidos: this.apellidos.value,
      tipoUsuario: 'cliente',
      activo: 'SI',
      email: this.email.value,
      password: this.password.value,
      idMunicipio: this.municipio.value,
      municipio: '',
      idProvincia: this.provincia.value,
      provincia: '',
      codigopostal: this.codigopostal.value,
    };

    this.clienteService
      .registerCliente(this.registerCliente)
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
