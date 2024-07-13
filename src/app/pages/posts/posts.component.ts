import { Component, OnInit } from '@angular/core';
import { PostsTableComponent } from '../../components/posts-table/posts-table.component';
import { TablePost } from '../../shared/interfaces/table-post';
import { forkJoin } from 'rxjs';
import { PostsService } from '../../shared/services/posts/posts.service';
import { UsersService } from '../../shared/services/users-service/users.service';
import { Post } from '../../shared/interfaces/post';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostsTableComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  posts: TablePost[];
  isLoading: boolean = false;

  constructor(
    private postsService: PostsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    forkJoin([
      this.postsService.getPosts(),
      this.usersService.getUsers(),
    ]).subscribe({
      next: ([posts, users]: [Post[], User[]]) => {
        setTimeout(() => {
          this.posts = posts.map((post: Post) => ({
            id: post.id,
            userName: users.find((user) => user.id === post.userId)?.name || '',
            postTitle: post.title,
          }));
        }, 700);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        setTimeout(() => {
          this.isLoading = false;
        }, 700);
      },
    });
  }
}
