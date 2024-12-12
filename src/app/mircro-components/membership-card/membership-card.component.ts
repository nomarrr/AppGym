import { Component, Input } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-membership-card',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './membership-card.component.html',
  styleUrl: './membership-card.component.css'
})
export class MembershipCardComponent {
  @Input() membershipName: string = 'Mes';
  @Input() membershipId: number = 0;
  @Input() price: number = 199.99;

  constructor(private router: Router) {}

  editMembership() {
    this.router.navigate(['/edit-membership', this.membershipId]);
  }

  deleteMembership() {
    console.log('deleteMembership');
  }

}
