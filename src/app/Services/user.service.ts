import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserDTO } from '../Models/user.dto';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'user';
    this.urlApi = 'http://127.0.0.1:8000/api/' + this.controller;
  }

  getUSerById(userId: string): Observable<UserDTO> {
    return this.http
      .get<UserDTO>(this.urlApi + '/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateUser(userId: string, user: UserDTO): Observable<UserDTO> {
    return this.http
      .put<UserDTO>(this.urlApi + '/' + userId, user)
      .pipe(catchError(this.sharedService.handleError));
  }
}
