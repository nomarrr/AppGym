import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscleGroupSetsComponent } from './muscle-group-sets.component';

describe('MuscleGroupSetsComponent', () => {
  let component: MuscleGroupSetsComponent;
  let fixture: ComponentFixture<MuscleGroupSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscleGroupSetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuscleGroupSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
