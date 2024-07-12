import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';
import { PostsComponent } from './pages/posts/posts.component';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:id', component: UserPostsComponent },
  { path: '**', component: NotFoundComponent },
];
