import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CategoriaDTO } from '../Models/categoria.dto';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'categoria';
    this.urlApi = 'http://127.0.0.1:8000/api/' + this.controller;
  }

  getCategorias(): Observable<CategoriaDTO[]> {
    return this.http
      .get<CategoriaDTO[]>(this.urlApi)
      .pipe(catchError(this.sharedService.handleError));
  }
}
