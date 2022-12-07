import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ProductoDTO } from '../Models/producto.dto';
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
export class ProductoService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'producto';
    this.urlApi = 'http://127.0.0.1:8000/api/' + this.controller;
  }

  getProductos(userId: string): Observable<ProductoDTO[]> {
    return this.http
      .get<ProductoDTO[]>(this.urlApi + 's/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }

  getProductoById(id: string): Observable<ProductoDTO> {
    return this.http
      .get<ProductoDTO>(this.urlApi + '/' + id)
      .pipe(catchError(this.sharedService.handleError));
  }

  createProducto(producto: ProductoDTO): Observable<ProductoDTO> {
    return this.http
      .post<ProductoDTO>(this.urlApi, producto)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateProducto(id: string, producto: ProductoDTO): Observable<ProductoDTO> {
    return this.http
      .put<ProductoDTO>(this.urlApi + '/' + id, producto)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteProducto(id: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlApi + '/' + id)
      .pipe(catchError(this.sharedService.handleError));
  }
}
