import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MensajeDTO } from '../Models/mensaje.dto';
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
export class MensajeService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'mensaje';
    this.urlApi = 'http://127.0.0.1:8000/api/' + this.controller;
  }

  getMensajes(userId: string): Observable<MensajeDTO[]> {
    return this.http
      .get<MensajeDTO[]>(this.urlApi + 's/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }

  getMensajeById(id: string): Observable<MensajeDTO> {
    return this.http
      .get<MensajeDTO>(this.urlApi + '/' + id)
      .pipe(catchError(this.sharedService.handleError));
  }

  createMensaje(mensaje: MensajeDTO): Observable<MensajeDTO> {
    return this.http
      .post<MensajeDTO>(this.urlApi, mensaje)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateMensaje(id: string, mensaje: MensajeDTO): Observable<MensajeDTO> {
    return this.http
      .put<MensajeDTO>(this.urlApi + '/' + id, mensaje)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteMensaje(id: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlApi + '/' + id)
      .pipe(catchError(this.sharedService.handleError));
  }
}
