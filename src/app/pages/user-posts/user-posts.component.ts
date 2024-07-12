import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../shared/services/posts/posts.service';
import Post from '../../shared/interfaces/post';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../shared/services/users-service/users.service';
import UserInterface from '../../shared/interfaces/user';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css',
})
export class UserPostsComponent implements OnInit {
  userId: string;
  isLoadingPosts: boolean = false;
  isLoadingUserName: boolean = false;
  posts: Post[] = [];
  userName: string = '';
  postsSkeleton: number[] = new Array(10).fill(0);

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      const userIdParam = id;
      if (userIdParam !== null && userIdParam !== undefined) {
        this.userId = userIdParam;
      }
    });
    if (this.userId) {
      this.getPostsById(this.userId);
      this.getUserById(this.userId);
    }
  }

  getPostsById = (userId: string) => {
    this.isLoadingPosts = true;
    this.postsService.getPostsByUserId(userId).subscribe({
      next: (posts: Post[]) => {
        setTimeout(() => {
          this.posts = posts;
        }, 1000);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        setTimeout(() => {
          this.isLoadingPosts = false;
        }, 1000);
      },
    });
  };

  getUserById = (userId: string) => {
    this.isLoadingUserName = true;
    this.usersService.getUserById(userId).subscribe({
      next: (user: UserInterface) => {
        console.log({ user });
        setTimeout(() => {
          this.userName = user.name;
        }, 1000);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        setTimeout(() => {
          this.isLoadingUserName = false;
        }, 1000);
      },
    });
  };
}
