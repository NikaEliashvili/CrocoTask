import { Component, Input, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import UserInterface from '../../shared/interfaces/userInterface';
import tableUser from '../../shared/interfaces/tableUser';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatPaginator,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class CustomTableComponent {
  displayedColumns: string[] = [
    'name',
    'phone',
    'email',
    'companyName',
    'posts_btn',
  ];

  @Input() users: tableUser[];
  @Input() isLoading: boolean;

  constructor() {}
}
