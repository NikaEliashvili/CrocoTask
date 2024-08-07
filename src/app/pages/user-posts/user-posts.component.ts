import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../shared/services/posts/posts.service';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../shared/services/users-service/users.service';
import { User } from '../../shared/interfaces/user';
import { Post } from '../../shared/interfaces/post';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css',
})
export class UserPostsComponent implements OnInit, OnDestroy {
  userId: string;
  isLoadingPosts: boolean = false;
  isLoadingUserName: boolean = false;
  posts: Post[] = [];
  userName: string = '';
  postsSubscribe: Subscription;
  userSubscribe: Subscription;
  userIdSubscribe: Subscription;
  postsSkeleton: number[] = new Array(10).fill(0);

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.userIdSubscribe = this.route.params.subscribe(({ id }) => {
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

  ngOnDestroy(): void {
    this.userIdSubscribe.unsubscribe();
    this.postsSubscribe.unsubscribe();
    this.userSubscribe.unsubscribe();
  }

  getPostsById = (userId: string) => {
    this.isLoadingPosts = true;
    this.postsSubscribe = this.postsService.getPostsByUserId(userId).subscribe({
      next: (posts: Post[]) => {
        setTimeout(() => {
          this.posts = posts;
        }, 700);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        setTimeout(() => {
          this.isLoadingPosts = false;
        }, 700);
      },
    });
  };

  getUserById = (userId: string) => {
    this.isLoadingUserName = true;
    this.userSubscribe = this.usersService.getUserById(userId).subscribe({
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
}
