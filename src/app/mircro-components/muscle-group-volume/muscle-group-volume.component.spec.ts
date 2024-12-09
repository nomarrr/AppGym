import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscleGroupVolumeComponent } from './muscle-group-volume.component';

describe('MuscleGroupVolumeComponent', () => {
  let component: MuscleGroupVolumeComponent;
  let fixture: ComponentFixture<MuscleGroupVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscleGroupVolumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuscleGroupVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
