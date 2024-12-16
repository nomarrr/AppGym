import { Component } from '@angular/core';
import { CoachProfileComponent } from '../../mircro-components/coach-profile/coach-profile.component';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-coach-self-profile',
  standalone: true,
  imports: [CoachProfileComponent, CoachSidebarComponent],
  templateUrl: './coach-self-profile.component.html',
  styleUrl: './coach-self-profile.component.css'
})
export class CoachSelfProfileComponent {
  userId: number;

  constructor(private tokenService: TokenService) {
    this.userId = this.tokenService.getUserIdFromToken();
  }
}
