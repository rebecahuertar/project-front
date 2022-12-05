import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClienteDTO } from '../Models/cliente.dto';
import { FavoritoDTO } from '../Models/favorito.dto';
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

  getClienteFavoritos(clienteId: string): Observable<FavoritoDTO[]> {
    return this.http
      .get<FavoritoDTO[]>(this.urlApi + '/favoritos/' + clienteId)
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

  deleteFavorito(
    idCliente: string,
    idComercio: string
  ): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(
        this.urlApi + '/favorito/' + idCliente + '/' + idComercio
      )
      .pipe(catchError(this.sharedService.handleError));
  }
}
