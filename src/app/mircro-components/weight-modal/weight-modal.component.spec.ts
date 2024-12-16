import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightModalComponent } from './weight-modal.component';

describe('WeightModalComponent', () => {
  let component: WeightModalComponent;
  let fixture: ComponentFixture<WeightModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
