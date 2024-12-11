import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewProfileComponent } from './admin-view-profile.component';

describe('AdminViewProfileComponent', () => {
  let component: AdminViewProfileComponent;
  let fixture: ComponentFixture<AdminViewProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
