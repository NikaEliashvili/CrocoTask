import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { TablePost } from '../../shared/interfaces/table-post';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '../../shared/interfaces/post';
import { PostDetailDialogComponent } from '../post-detail-dialog/post-detail-dialog.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-posts-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterLink, SpinnerComponent],
  templateUrl: './posts-table.component.html',
  styleUrl: './posts-table.component.css',
})
export class PostsTableComponent {
  displayedColumns: string[] = ['userName', 'postTitle', 'actions'];
  @Input() posts: TablePost[];
  @Input() isLoading: boolean;

  constructor(private dialog: MatDialog) {}

  openDialog(postId: number): void {
    this.dialog.open(PostDetailDialogComponent, {
      data: {
        postId: postId,
      },
    });
  }
}
