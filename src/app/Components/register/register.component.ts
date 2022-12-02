import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/Models/user.dto';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerUser: UserDTO;

  tipoUsuario: FormControl;

  registerForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private router: Router
  ) {
    this.isValidForm = null;
    this.registerUser = new UserDTO('', '', '', '', '');

    this.tipoUsuario = new FormControl(this.registerUser.tipoUsuario, [
      Validators.required,
    ]);

    this.registerForm = this.formBuilder.group({
      tipoUsuario: this.tipoUsuario,
    });
  }

  ngOnInit(): void {}

  seleccionar(): void {
    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;

    if (this.registerForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.registerUser = {
      nombre: '',
      apellidos: '',
      email: '',
      password: '',
      tipoUsuario: this.tipoUsuario.value,
    };

    if (this.registerUser.tipoUsuario == 'cliente') {
      this.router.navigateByUrl('register-cliente');
    } else {
      this.router.navigateByUrl('register-comercio');
    }
  }
}
