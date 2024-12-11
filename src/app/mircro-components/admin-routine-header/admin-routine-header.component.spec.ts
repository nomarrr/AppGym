import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoutineHeaderComponent } from './admin-routine-header.component';

describe('AdminRoutineHeaderComponent', () => {
  let component: AdminRoutineHeaderComponent;
  let fixture: ComponentFixture<AdminRoutineHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRoutineHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRoutineHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
