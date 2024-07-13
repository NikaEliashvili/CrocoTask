import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { API_URL } from '../config';
import { Observable } from 'rxjs';
import { Todo } from '../../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private todosUrl = API_URL + '/todos';
  constructor(private apiService: ApiService) {}

  getTodos = (): Observable<Todo[]> => {
    return this.apiService.get(this.todosUrl);
  };

  getTodosByUserId = (userId: number): Observable<Todo[]> => {
    return this.apiService.get(`${this.todosUrl}?userId=${userId}`);
  };
}
