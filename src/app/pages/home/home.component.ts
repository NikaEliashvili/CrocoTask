import { Component, OnInit } from '@angular/core';
import { CustomTableComponent } from '../../components/users-table/users-table.component';
import { UsersService } from '../../shared/services/users-service/users.service';
import { CommonModule } from '@angular/common';
import { tableUser } from '../../shared/interfaces/table-user';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CustomTableComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  users: tableUser[] = [];
  filteredData: tableUser[] = [];
  loading: boolean = false;

  constructor(private usersService: UsersService) {
    this.fetchUsers();
  }
  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.usersService.getUsers().subscribe({
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
