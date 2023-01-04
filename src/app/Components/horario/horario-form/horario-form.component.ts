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
import { HorarioDTO } from 'src/app/Models/horario.dto';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { HorarioService } from 'src/app/Services/horario.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-horario-form',
  templateUrl: './horario-form.component.html',
  styleUrls: ['./horario-form.component.scss'],
})
export class HorarioFormComponent implements OnInit {
  showNoAuthSection: boolean;
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;

  horario: HorarioDTO;

  descripcion: FormControl;
  visible: FormControl;

  horarioForm: FormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;

  private idHorario: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private horarioService: HorarioService,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.showNoAuthSection = false;
    this.showAuthSectionCliente = true;
    this.showAuthSectionComercio = false;

    this.idHorario = this.activatedRoute.snapshot.paramMap.get('id');

    this.horario = new HorarioDTO('', '', '', 'SI');

    this.isUpdateMode = false;

    this.isValidForm = null;

    this.descripcion = new FormControl(this.horario.descripcion, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(40),
    ]);

    this.visible = new FormControl(this.horario.visible, [
      // Validators.required
    ]);

    this.horarioForm = this.formBuilder.group({
      descripcion: this.descripcion,
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

    if (this.idHorario) {
      this.isUpdateMode = true;
      this.horarioService.getHorarioById(this.idHorario).subscribe({
        next: (horario: HorarioDTO) => {
          this.horario = horario;

          this.descripcion.setValue(this.horario.descripcion);
          this.visible.setValue(this.horario.visible);

          this.horarioForm = this.formBuilder.group({
            descripcion: this.descripcion,
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

  editHorario(): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    if (this.idHorario) {
      const userId = this.localStorageService.get('user_id');
      if (userId) {
        this.horario.idComercio = userId;

        this.horarioService
          .updateHorario(this.idHorario, this.horario)
          .pipe(
            finalize(async () => {
              await this.sharedService.managementToast(
                'horarioFeedback',
                responseOK,
                errorResponse
              );

              if (responseOK) {
                this.router.navigateByUrl('horarios');
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

  createHorario(): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.horario.idComercio = userId;

      this.horarioService
        .createHorario(this.horario)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'horarioFeedback',
              responseOK,
              errorResponse
            );

            if (responseOK) {
              this.router.navigateByUrl('horarios');
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
  saveHorario(): void {
    this.isValidForm = false;

    if (this.horarioForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.horario = this.horarioForm.value;

    if (this.isUpdateMode) {
      this.editHorario();
    } else {
      this.createHorario();
    }
  }
  volver(): void {
    this.router.navigateByUrl('horarios');
  }

  home(): void {
    this.router.navigateByUrl('home');
  }
}
