import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthDTO } from 'src/app/Models/auth.dto';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { AuthService, AuthToken } from 'src/app/Services/auth.service';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUser: AuthDTO;
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.loginUser = new AuthDTO('', '', '', '', '');

    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  login(): void {
    let responseOK: boolean = false;
    let errorResponse: any;

    this.loginUser.email = this.email.value;
    this.loginUser.password = this.password.value;

    this.authService
      .login(this.loginUser)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'loginFeedback',
            responseOK,
            errorResponse
          );

          if (responseOK) {
            //tenemos que ver si el login es de un comercio va a la vista del comercio
            //si el login es de un cliente va a la vista del cliente.
            if (this.loginUser.tipo_usuario == 'comercio') {
              const headerInfo: HeaderMenus = {
                showNoAuthSection: false,
                showAuthSectionCliente: false,
                showAuthSectionComercio: true,
              };
              this.headerMenusService.headerManagement.next(headerInfo);
              this.router.navigateByUrl('comercio-cuenta');
            } else {
              const headerInfo: HeaderMenus = {
                showNoAuthSection: false,
                showAuthSectionCliente: true,
                showAuthSectionComercio: false,
              };
              this.headerMenusService.headerManagement.next(headerInfo);
              this.router.navigateByUrl('cliente-cuenta');
            }
          }
        })
      )
      .subscribe({
        next: (resp: AuthToken) => {
          responseOK = true;
          this.loginUser.user_id = resp.user_id;
          this.loginUser.tipo_usuario = resp.tipo_usuario;
          this.loginUser.access_token = resp.access_token;

          this.localStorageService.set('user_id', this.loginUser.user_id);
          this.localStorageService.set(
            'tipo_usuario',
            this.loginUser.tipo_usuario
          );
          this.localStorageService.set(
            'access_token',
            this.loginUser.access_token
          );
        },
        error: (error: HttpErrorResponse) => {
          responseOK = false;
          errorResponse = error.error;
          const headerInfo: HeaderMenus = {
            showNoAuthSection: true,
            showAuthSectionCliente: false,
            showAuthSectionComercio: false,
          };
          this.headerMenusService.headerManagement.next(headerInfo);

          //this.sharedService.errorLog(error.error);
        },
      });
  }
}
