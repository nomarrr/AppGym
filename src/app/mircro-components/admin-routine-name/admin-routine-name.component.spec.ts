import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoutineNameComponent } from './admin-routine-name.component';

describe('AdminRoutineNameComponent', () => {
  let component: AdminRoutineNameComponent;
  let fixture: ComponentFixture<AdminRoutineNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRoutineNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRoutineNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
