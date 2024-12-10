import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../../mircro-components/admin-sidebar/admin-sidebar.component';
import { AdminClientListComponent } from '../../mircro-components/admin-client-list/admin-client-list.component';

@Component({
  selector: 'app-add-coach',
  standalone: true,
  imports: [AdminSidebarComponent, AdminClientListComponent],
  templateUrl: './add-coach.component.html',
  styleUrl: './add-coach.component.css'
})
export class AddCoachComponent {

}
