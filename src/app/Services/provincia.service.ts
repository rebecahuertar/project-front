import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ProvinciaDTO } from '../Models/provincia.dto';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class ProvinciaService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'provincia';
    this.urlApi = 'http://127.0.0.1:8000/api/' + this.controller;
  }

  getProvincias(): Observable<ProvinciaDTO[]> {
    return this.http
      .get<ProvinciaDTO[]>(this.urlApi)
      .pipe(catchError(this.sharedService.handleError));
  }
}
