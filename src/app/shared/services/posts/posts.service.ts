import { Injectable } from '@angular/core';
import { API_URL } from '../config';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { Post } from '../../interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postsUrl = API_URL + '/posts';
  constructor(private apiService: ApiService) {}

  getPosts = (): Observable<Post[]> => {
    return this.apiService.get(this.postsUrl);
  };

  getPostsByUserId = (userId: string): Observable<Post[]> => {
    return this.apiService.get(this.postsUrl + '?userId=' + userId);
  };
  getPostById = (postId: number | string): Observable<Post> => {
    return this.apiService.get(`${this.postsUrl}/${postId}`);
  };
}
