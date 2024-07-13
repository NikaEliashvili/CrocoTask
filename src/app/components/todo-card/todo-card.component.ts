import { Component, Input } from '@angular/core';
import { Todo } from '../../shared/interfaces/todo';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.css',
})
export class TodoCardComponent {
  @Input() todo: Todo;
  @Input() userName: string;
  constructor() {}
}
