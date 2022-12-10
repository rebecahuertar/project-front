import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
export class FavoritoService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'favorito';
    this.urlApi = 'http://127.0.0.1:8000/api/' + this.controller;
  }

  //listado de comercios favoritos de un cliente
  getClienteFavoritos(clienteId: string): Observable<FavoritoDTO[]> {
    return this.http
      .get<FavoritoDTO[]>(this.urlApi + 's/' + clienteId)
      .pipe(catchError(this.sharedService.handleError));
  }

  //listado de los mensajes de los comercios favoritos de un cliente
  getClienteMensajesFavoritos(
    clienteId: string
  ): Observable<MensajeClienteDTO[]> {
    return this.http
      .get<MensajeClienteDTO[]>(this.urlApi + 's/vermensajes/' + clienteId)
      .pipe(catchError(this.sharedService.handleError));
  }

  //para modificar si el cliente quiere o no ver los mensajes de un comercio.
  updateVerMensaje(id: string, favorito: FavoritoDTO): Observable<FavoritoDTO> {
    return this.http
      .put<FavoritoDTO>(this.urlApi + '/vermensaje/' + id, favorito)
      .pipe(catchError(this.sharedService.handleError));
  }

  //Comprobar si este comercio es favorito o no del cliente
  comprobarFavorito(
    idCliente: string,
    idComercio: string
  ): Observable<boolean> {
    return this.http
      .get<boolean>(
        this.urlApi + '/comprobarFav/' + idCliente + '/' + idComercio
      )
      .pipe(catchError(this.sharedService.handleError));
  }

  //añadir un comercio favorito a un cliente
  anyadeFavorito(favorito: FavoritoDTO): Observable<FavoritoDTO> {
    return this.http
      .post<FavoritoDTO>(this.urlApi, favorito)
      .pipe(catchError(this.sharedService.handleError));
  }

  //borrar el comercio favorito de un cliente
  deleteFavorito(
    idCliente: string,
    idComercio: string
  ): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlApi + '/' + idCliente + '/' + idComercio)
      .pipe(catchError(this.sharedService.handleError));
  }
}
