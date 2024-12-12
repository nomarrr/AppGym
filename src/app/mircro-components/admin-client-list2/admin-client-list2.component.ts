import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientCardComponent } from '../client-card/client-card.component';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-client-list2',
  standalone: true,
  imports: [CommonModule, FormsModule, ClientCardComponent],
  templateUrl: './admin-client-list2.component.html',
  styleUrl: './admin-client-list2.component.css'
})
export class AdminClientList2Component implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
      },
      error: (error) => {
        console.error('Error cargando usuarios:', error);
      }
    });
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = this.users;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter(user => 
        user.name.toLowerCase().includes(searchTermLower)
      );
    }
  }
}
