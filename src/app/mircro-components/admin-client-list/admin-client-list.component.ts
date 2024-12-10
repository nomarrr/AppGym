import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoachClientCardComponent } from '../coach-client-card/coach-client-card.component';
import { AdminService } from '../../services/admin.service';

interface User {
  id: number;
  name: string;
  image_url: string;
}

@Component({
  selector: 'app-admin-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CoachClientCardComponent],
  templateUrl: './admin-client-list.component.html',
  styleUrl: './admin-client-list.component.css'
})
export class AdminClientListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        console.log('Usuarios cargados:', users);
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = this.users;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase().trim();
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(searchTermLower)
    );
  }
}
