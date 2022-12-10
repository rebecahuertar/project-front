import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClienteDTO } from '../Models/cliente.dto';

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
export class ClienteService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'cliente';
    this.urlApi = 'http://127.0.0.1:8000/api/' + this.controller;
  }

  registerCliente(cliente: ClienteDTO): Observable<ClienteDTO> {
    return this.http
      .post<ClienteDTO>(this.urlApi, cliente)
      .pipe(catchError(this.sharedService.handleError));
  }

  getClienteById(clienteId: string): Observable<ClienteDTO> {
    return this.http
      .get<ClienteDTO>(this.urlApi + '/' + clienteId)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateCliente(
    idCliente: string,
    cliente: ClienteDTO
  ): Observable<ClienteDTO> {
    return this.http
      .put<ClienteDTO>(this.urlApi + '/' + idCliente, cliente)
      .pipe(catchError(this.sharedService.handleError));
  }
}
