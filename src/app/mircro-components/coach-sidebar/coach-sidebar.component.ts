import { Component } from '@angular/core';

@Component({
  selector: 'app-coach-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './coach-sidebar.component.html',
  styleUrl: './coach-sidebar.component.css'
})
export class CoachSidebarComponent {
  activeItem: string = '';

  setActiveItem(itemId: string) {
    this.activeItem = itemId;
  }
}
