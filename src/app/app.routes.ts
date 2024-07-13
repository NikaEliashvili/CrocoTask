import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';
import { PostsComponent } from './pages/posts/posts.component';
import { UserTodosComponent } from './pages/user-todos/user-todos.component';
import { TodosComponent } from './pages/todos/todos.component';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'todos', component: TodosComponent },
  { path: 'users/:id/posts', component: UserPostsComponent },
  { path: 'users/:id/todos', component: UserTodosComponent },
  { path: '**', component: NotFoundComponent },
];
