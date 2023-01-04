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
import { MensajeDTO } from 'src/app/Models/mensaje.dto';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { MensajeService } from 'src/app/Services/mensaje.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-mensaje-form',
  templateUrl: './mensaje-form.component.html',
  styleUrls: ['./mensaje-form.component.scss'],
})
export class MensajeFormComponent implements OnInit {
  showNoAuthSection: boolean;
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;

  mensajeM: MensajeDTO;

  mensaje: FormControl;
  visible: FormControl;

  mensajeForm: FormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;

  private idMensaje: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mensajeService: MensajeService,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.showNoAuthSection = false;
    this.showAuthSectionCliente = true;
    this.showAuthSectionComercio = false;

    this.idMensaje = this.activatedRoute.snapshot.paramMap.get('id');

    this.mensajeM = new MensajeDTO('', '', '', 'SI');

    this.isUpdateMode = false;

    this.isValidForm = null;

    this.mensaje = new FormControl(this.mensajeM.mensaje, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
    ]);

    this.visible = new FormControl(this.mensajeM.visible, [
      Validators.required,
    ]);

    this.mensajeForm = this.formBuilder.group({
      mensaje: this.mensaje,
      visible: this.visible,
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

    if (this.idMensaje) {
      this.isUpdateMode = true;
      this.mensajeService.getMensajeById(this.idMensaje).subscribe({
        next: (mensaje: MensajeDTO) => {
          this.mensajeM = mensaje;

          this.mensaje.setValue(this.mensajeM.mensaje);
          this.visible.setValue(this.mensajeM.visible);

          this.mensajeForm = this.formBuilder.group({
            mensaje: this.mensaje,
            visible: this.visible,
          });
        },
        error: (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        },
      });
    }
  }

  editMensaje(): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    if (this.idMensaje) {
      const userId = this.localStorageService.get('user_id');
      if (userId) {
        this.mensajeM.idComercio = userId;

        this.mensajeService
          .updateMensaje(this.idMensaje, this.mensajeM)
          .pipe(
            finalize(async () => {
              await this.sharedService.managementToast(
                'mensajeFeedback',
                responseOK,
                errorResponse
              );

              if (responseOK) {
                this.router.navigateByUrl('mensajes');
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

  createMensaje(): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.mensajeM.idComercio = userId;

      this.mensajeService
        .createMensaje(this.mensajeM)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'mensajeFeedback',
              responseOK,
              errorResponse
            );

            if (responseOK) {
              this.router.navigateByUrl('mensajes');
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
  saveMensaje(): void {
    this.isValidForm = false;

    if (this.mensajeForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.mensajeM = this.mensajeForm.value;

    if (this.isUpdateMode) {
      this.editMensaje();
    } else {
      this.createMensaje();
    }
  }

  volver(): void {
    this.router.navigateByUrl('mensajes');
  }

  home(): void {
    this.router.navigateByUrl('home');
  }
}
