import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DiaaperturaDTO } from '../Models/diaapertura.dto';
import { SharedService } from './shared.service';

export interface updateResponse {
  affected: number;
}

export interface deleteResponse {
  affected: number;
}

@Injectable({
  providedIn: 'root',
})
export class DiaaperturaService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'dia';
    this.urlApi = 'http://127.0.0.1:8000/api/' + this.controller;
  }

  getDias(userId: string): Observable<DiaaperturaDTO[]> {
    return this.http
      .get<DiaaperturaDTO[]>(this.urlApi + 's/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }

  getDiaById(id: string): Observable<DiaaperturaDTO> {
    return this.http
      .get<DiaaperturaDTO>(this.urlApi + '/' + id)
      .pipe(catchError(this.sharedService.handleError));
  }

  createDia(dia: DiaaperturaDTO): Observable<DiaaperturaDTO> {
    return this.http
      .post<DiaaperturaDTO>(this.urlApi, dia)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateDia(id: string, dia: DiaaperturaDTO): Observable<DiaaperturaDTO> {
    return this.http
      .put<DiaaperturaDTO>(this.urlApi + '/' + id, dia)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteDia(id: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlApi + '/' + id)
      .pipe(catchError(this.sharedService.handleError));
  }
}
