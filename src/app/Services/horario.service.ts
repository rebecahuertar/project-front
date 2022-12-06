import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HorarioDTO } from '../Models/horario.dto';
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
export class HorarioService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'horario';
    this.urlApi = 'http://127.0.0.1:8000/api/' + this.controller;
  }

  getHorarios(userId: string): Observable<HorarioDTO[]> {
    return this.http
      .get<HorarioDTO[]>(this.urlApi + 's/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }

  getHorarioById(id: string): Observable<HorarioDTO> {
    return this.http
      .get<HorarioDTO>(this.urlApi + '/' + id)
      .pipe(catchError(this.sharedService.handleError));
  }

  createHorario(horario: HorarioDTO): Observable<HorarioDTO> {
    return this.http
      .post<HorarioDTO>(this.urlApi, horario)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateHorario(id: string, horario: HorarioDTO): Observable<HorarioDTO> {
    return this.http
      .put<HorarioDTO>(this.urlApi + '/' + id, horario)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteHorario(id: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlApi + '/' + id)
      .pipe(catchError(this.sharedService.handleError));
  }
}
