import { Injectable } from '@angular/core';
import { API_URL } from '../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import UserInterface from '../../interfaces/userInterface';
import { ApiService } from '../api/api.service';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersApi = API_URL + '/users';
  constructor(private apiService: ApiService) {}

  getUsers = (): Observable<any> => {
    return this.apiService.get(this.usersApi);
  };
}
