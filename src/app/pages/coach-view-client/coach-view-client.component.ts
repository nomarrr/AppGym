import { Component, Input } from '@angular/core';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { GreyBtnComponent } from '../../mircro-components/grey-btn/grey-btn.component';

@Component({
  selector: 'app-coach-view-client',
  standalone: true,
  imports: [CoachSidebarComponent, GreyBtnComponent],
  templateUrl: './coach-view-client.component.html',
  styleUrl: './coach-view-client.component.css'
})
export class CoachViewClientComponent {
  @Input() imgSrc: string = 'img/User.png';
  @Input() clientName: string = 'Cliente 1';
  @Input() clientBio: string = 'Descripcion';
}
