import { Component, Input, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import UserInterface from '../../shared/interfaces/user';
import tableUser from '../../shared/interfaces/table-user';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';

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
    SpinnerComponent,
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class CustomTableComponent {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'phone',
    'email',
    'companyName',
    'actions',
  ];

  @Input() users: tableUser[];
  @Input() isLoading: boolean;

  constructor() {}
}
