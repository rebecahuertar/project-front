import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { MunicipioDTO } from '../Models/municipio.dto';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class MunicipioService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'municipio';
    this.urlApi = 'http://127.0.0.1:8000/api/' + this.controller;
  }

  getMunicipios(idProvincia: string): Observable<MunicipioDTO[]> {
    return this.http
      .get<MunicipioDTO[]>(this.urlApi + 's/' + idProvincia)
      .pipe(catchError(this.sharedService.handleError));
  }
}
