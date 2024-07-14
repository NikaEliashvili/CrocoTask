import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../../shared/interfaces/todo';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../shared/services/todos/todos.service';
import { UsersService } from '../../shared/services/users-service/users.service';
import { User } from '../../shared/interfaces/user';
import { TodoCardComponent } from '../../components/todo-card/todo-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-todos',
  standalone: true,
  imports: [CommonModule, TodoCardComponent],
  templateUrl: './user-todos.component.html',
  styleUrl: './user-todos.component.css',
})
export class UserTodosComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  userId: number;
  userName: string;
  isLoadingTodos: boolean = false;
  isLoadingUserName: boolean = false;
  todosSkeleton: number[] = new Array(10).fill(0);

  userIdSubscribe: Subscription;
  todosSubscribe: Subscription;
  userNameSubscribe: Subscription;

  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.userIdSubscribe = this.route.params.subscribe(({ id }) => {
      if (id !== null && id !== undefined) {
        this.userId = +id;
      }
    });
    if (this.userId) {
      this.getTodosByUserId(this.userId);
      this.getUserById(this.userId);
    }
  }

  ngOnDestroy(): void {
    this.todosSubscribe.unsubscribe();
    this.userIdSubscribe.unsubscribe();
    this.userNameSubscribe.unsubscribe();
  }

  getUserById = (userId: number) => {
    this.isLoadingUserName = true;
    this.userNameSubscribe = this.usersService.getUserById(userId).subscribe({
      next: (user: User) => {
        setTimeout(() => {
          this.userName = user.name;
        }, 700);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        setTimeout(() => {
          this.isLoadingUserName = false;
        }, 700);
      },
    });
  };

  getTodosByUserId = (userId: number) => {
    this.isLoadingTodos = true;
    this.todosSubscribe = this.todosService.getTodosByUserId(userId).subscribe({
      next: (todos: Todo[]) => {
        setTimeout(() => {
          this.todos = todos;
        }, 700);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        setTimeout(() => {
          this.isLoadingTodos = false;
        }, 700);
      },
    });
  };
}
