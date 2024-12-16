import { Component } from '@angular/core';
import { ProfileComponent } from '../../mircro-components/profile/profile.component';
import { SidebarComponent } from '../../mircro-components/sidebar/sidebar.component';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-client-self-profile',
  standalone: true,
  imports: [ProfileComponent, SidebarComponent],
  templateUrl: './client-self-profile.component.html',
  styleUrl: './client-self-profile.component.css'
})
export class ClientSelfProfileComponent {
  userId: number;

  constructor(private tokenService: TokenService) {
    this.userId = this.tokenService.getUserIdFromToken();
  }
}
