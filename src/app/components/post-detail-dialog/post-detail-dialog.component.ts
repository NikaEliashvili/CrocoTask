import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Post } from '../../shared/interfaces/post';
import { PostsService } from '../../shared/services/posts/posts.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatButton } from '@angular/material/button';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-detail-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    SpinnerComponent,
    MatButton,
  ],
  templateUrl: './post-detail-dialog.component.html',
  styleUrl: './post-detail-dialog.component.css',
})
export class PostDetailDialogComponent implements OnInit, OnDestroy {
  post: Post;
  postSubscribe: Subscription;
  isLoading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { postId: number },
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  ngOnDestroy(): void {
    this.postSubscribe.unsubscribe();
  }

  getPost = () => {
    this.isLoading = true;
    this.postSubscribe = this.postsService
      .getPostById(this.data.postId)
      .subscribe({
        next: (post: Post) => {
          setTimeout(() => {
            this.post = post;
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
  };
}
