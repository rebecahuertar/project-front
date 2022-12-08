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
import { DiaaperturaDTO } from 'src/app/Models/diaapertura.dto';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { DiaaperturaService } from 'src/app/Services/diaapertura.service';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';
@Component({
  selector: 'app-diaapertura-form',
  templateUrl: './diaapertura-form.component.html',
  styleUrls: ['./diaapertura-form.component.scss'],
})
export class DiaaperturaFormComponent implements OnInit {
  showNoAuthSection: boolean;
  showAuthSectionCliente: boolean;
  showAuthSectionComercio: boolean;

  diaA: DiaaperturaDTO;

  dia: FormControl;
  estado: FormControl;
  visible: FormControl;

  diaForm: FormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;

  private idDia: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private diaaperturaService: DiaaperturaService,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.showNoAuthSection = false;
    this.showAuthSectionCliente = true;
    this.showAuthSectionComercio = false;

    this.idDia = this.activatedRoute.snapshot.paramMap.get('id');

    this.diaA = new DiaaperturaDTO('', '', new Date(), '', '');

    this.isUpdateMode = false;

    this.isValidForm = null;

    this.dia = new FormControl(this.diaA.dia, [Validators.required]);
    this.estado = new FormControl(this.diaA.estado, [Validators.required]);

    this.visible = new FormControl(this.diaA.visible, [Validators.required]);

    this.diaForm = this.formBuilder.group({
      dia: this.dia,
      estado: this.estado,
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

    if (this.idDia) {
      this.isUpdateMode = true;
      this.diaaperturaService.getDiaById(this.idDia).subscribe({
        next: (dia: DiaaperturaDTO) => {
          this.diaA = dia;

          this.dia.setValue(this.diaA.dia);
          this.estado.setValue(this.diaA.estado);
          this.visible.setValue(this.diaA.visible);

          this.diaForm = this.formBuilder.group({
            dia: this.dia,
            estado: this.estado,
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

  editDia(): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    if (this.idDia) {
      const userId = this.localStorageService.get('user_id');
      if (userId) {
        this.diaA.idComercio = userId;

        this.diaaperturaService
          .updateDia(this.idDia, this.diaA)
          .pipe(
            finalize(async () => {
              await this.sharedService.managementToast(
                'diaFeedback',
                responseOK,
                errorResponse
              );

              if (responseOK) {
                this.router.navigateByUrl('aperturas');
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

  createDia(): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.diaA.idComercio = userId;

      this.diaaperturaService
        .createDia(this.diaA)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'diaFeedback',
              responseOK,
              errorResponse
            );

            if (responseOK) {
              this.router.navigateByUrl('aperturas');
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
  saveDia(): void {
    this.isValidForm = false;

    if (this.diaForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.diaA = this.diaForm.value;

    if (this.isUpdateMode) {
      this.editDia();
    } else {
      this.createDia();
    }
  }
}
