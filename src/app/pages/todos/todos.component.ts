import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckbox } from '@angular/material/checkbox';
import { TableTodo } from '../../shared/interfaces/table-todo';
import { TodosTableComponent } from '../../components/todos-table/todos-table.component';
import { TodosService } from '../../shared/services/todos/todos.service';
import { UsersService } from '../../shared/services/users-service/users.service';
import { Todo } from '../../shared/interfaces/todo';
import { forkJoin, Subscription } from 'rxjs';
import { User } from '../../shared/interfaces/user';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import {
  FormControl,
  FormControlName,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    MatTableModule,
    MatCheckbox,
    TodosTableComponent,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit, OnDestroy {
  todos: TableTodo[];
  todosSubscribe: Subscription;
  filteredTodos: TableTodo[];
  isLoading: boolean = false;
  isFiltering: boolean = false;

  constructor(
    private todosService: TodosService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getTodos();
  }

  ngOnDestroy(): void {
    this.todosSubscribe.unsubscribe();
  }

  filtersForm = new FormGroup({
    isCompleted: new FormControl(-1),
  });

  // Get Todos with forkjoin to concat with author username
  getTodos = () => {
    this.isLoading = true;

    this.todosSubscribe = forkJoin([
      this.todosService.getTodos(),
      this.usersService.getUsers(),
    ]).subscribe({
      next: ([todos, users]: [Todo[], User[]]) => {
        const modifiedTodos = todos.map((todo) => ({
          ...todo,
          author: users.find((user) => user.id === todo.userId)?.name || '',
        }));

        setTimeout(() => {
          this.todos = modifiedTodos;
          this.filteredTodos = modifiedTodos;
        }, 700);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        setTimeout(() => {
          this.isLoading = false;
        }, 700);
      },
    });
  };

  handleFilters = () => {
    this.isLoading = true;
    const isCompleted = Number(this.filtersForm.value.isCompleted);
    if (isCompleted !== -1) {
      this.isFiltering = true;
    } else {
      this.isFiltering = false;
    }
    setTimeout(() => {
      this.isLoading = false;
      this.filteredTodos = this.filterTodos(isCompleted);
    }, 500);
  };

  filterTodos = (isCompleted: number) => {
    const filteredTodos: TableTodo[] = this.todos;
    if (isCompleted === 0) {
      return filteredTodos.filter((todo) => todo.completed === !!isCompleted);
    }
    if (isCompleted === 1) {
      return filteredTodos.filter((todo) => todo.completed === !!isCompleted);
    }
    return this.todos;
  };
}
