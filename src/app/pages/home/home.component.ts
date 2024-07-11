import { Component, OnInit } from '@angular/core';
import { CustomTableComponent } from '../../components/users-table/users-table.component';
import { UsersService } from '../../shared/services/users-service/users.service';
import UserInterface from '../../shared/interfaces/userInterface';
import { CommonModule } from '@angular/common';
import tableUser from '../../shared/interfaces/tableUser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CustomTableComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  users: tableUser[] = [];
  loading: boolean = false;

  constructor(private usersService: UsersService) {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.usersService.getUsers().subscribe({
      next: (users: UserInterface[]) => {
        this.users = users.map((user: UserInterface) => ({
          id: user.id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          companyName: user.company.name,
        }));
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Finished');
        setTimeout(() => {
          this.loading = false;
        }, 500);
      },
    });
  }
  ngOnInit(): void {
    this.fetchUsers();
  }
}
