import { Component, Input } from '@angular/core';
import { TableTodo } from '../../shared/interfaces/table-todo';
import { CommonModule } from '@angular/common';
import { MatRow, MatTable, MatTableModule } from '@angular/material/table';
import { MatCheckbox } from '@angular/material/checkbox';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-todos-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    SpinnerComponent,
    MatCheckbox,
  ],
  templateUrl: './todos-table.component.html',
  styleUrl: './todos-table.component.css',
})
export class TodosTableComponent {
  displayedColumns: string[] = ['author', 'title', 'completed'];

  @Input() todos: TableTodo[];
  @Input() isLoading: boolean;
}
