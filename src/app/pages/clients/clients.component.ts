import { Component } from '@angular/core';
import { AdminSidebarComponent} from '../../mircro-components/admin-sidebar/admin-sidebar.component';
import { AdminClientList2Component } from '../../mircro-components/admin-client-list2/admin-client-list2.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [AdminSidebarComponent, AdminClientList2Component],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {

}
