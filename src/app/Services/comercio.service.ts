import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ComercioDTO } from '../Models/comercio.dto';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class ComercioService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'comercio';
    this.urlApi = 'http://127.0.0.1:8000/api/' + this.controller;
  }

  registerComercio(comercio: ComercioDTO): Observable<ComercioDTO> {
    return this.http
      .post<ComercioDTO>(this.urlApi, comercio)
      .pipe(catchError(this.sharedService.handleError));
  }
}
