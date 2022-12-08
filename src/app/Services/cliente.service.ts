import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClienteDTO } from '../Models/cliente.dto';
import { FavoritoDTO } from '../Models/favorito.dto';
import { MensajeClienteDTO } from '../Models/mensajecliente.dto';
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

  getClienteFavoritos(clienteId: string): Observable<FavoritoDTO[]> {
    return this.http
      .get<FavoritoDTO[]>(this.urlApi + '/favoritos/' + clienteId)
      .pipe(catchError(this.sharedService.handleError));
  }

  getClienteMensajesFavoritos(
    clienteId: string
  ): Observable<MensajeClienteDTO[]> {
    return this.http
      .get<MensajeClienteDTO[]>(this.urlApi + '/mensajes/' + clienteId)
      .pipe(catchError(this.sharedService.handleError));
  }

  /* updateNoVerMensaje(idFavorito:string): Observable<FavoritoDTO> {
    return this.http
      .put<FavoritoDTO>(this.urlApi + '/nomensaje/' + idFavorito)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateSiVerMensaje(idCliente:string, idComercio: string): Observable<FavoritoDTO> {
    return this.http
      .put<FavoritoDTO>(this.urlApi + '/simensaje/' + idFavorito)
      .pipe(catchError(this.sharedService.handleError));
  }*/

  deleteFavorito(id: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlApi + '/favorito/' + id)
      .pipe(catchError(this.sharedService.handleError));
  }
}
