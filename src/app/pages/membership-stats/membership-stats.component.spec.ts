import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipStatsComponent } from './membership-stats.component';

describe('MembershipStatsComponent', () => {
  let component: MembershipStatsComponent;
  let fixture: ComponentFixture<MembershipStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
