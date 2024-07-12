import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import Post from '../../shared/interfaces/post';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  @Input() post: Post;
  constructor() {}
}
