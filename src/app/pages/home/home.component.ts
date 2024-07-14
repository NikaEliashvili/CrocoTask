import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomTableComponent } from '../../components/users-table/users-table.component';
import { UsersService } from '../../shared/services/users-service/users.service';
import { CommonModule } from '@angular/common';
import { tableUser } from '../../shared/interfaces/table-user';
import { User } from '../../shared/interfaces/user';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CustomTableComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  users: tableUser[] = [];
  usersSubscribe: Subscription;
  filteredData: tableUser[] = [];
  loading: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  ngOnDestroy(): void {
    // clean subscription from "usersSubscribe"
    this.usersSubscribe.unsubscribe();
  }

  fetchUsers() {
    this.loading = true;
    this.usersSubscribe = this.usersService.getUsers().subscribe({
      next: (users: User[]) => {
        setTimeout(() => {
          const usersArray = users.map((user: User) => ({
            id: user.id,
            firstName: user.name.split(' ')?.[0] || '',
            lastName: user.name.split(' ')?.[1] || '',
            phone: user.phone,
            email: user.email,
            companyName: user.company.name,
          }));
          this.users = usersArray;
          this.filteredData = usersArray;
        }, 700);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        setTimeout(() => {
          this.loading = false;
        }, 700);
      },
    });
  }

  handleSearch = (searchTerm: string) => {
    this.loading = true;
    const filteredData = this.users.filter((user) => {
      const searchTermLowerCased = searchTerm.toLowerCase();
      const firstNameLowerCased = user.firstName.toLowerCase();
      const lastNameLowerCased = user.lastName.toLowerCase();
      const emailLowerCased = user.email.toLowerCase();

      if (firstNameLowerCased.includes(searchTermLowerCased)) {
        return true;
      }
      if (lastNameLowerCased.includes(searchTermLowerCased)) {
        return true;
      }
      if (emailLowerCased.includes(searchTermLowerCased)) {
        return true;
      }
      return false;
    });

    setTimeout(() => {
      this.filteredData = filteredData;
      this.loading = false;
    }, 500);
  };
}
