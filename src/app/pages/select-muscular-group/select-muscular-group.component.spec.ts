import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMuscularGroupComponent } from './select-muscular-group.component';

describe('SelectMuscularGroupComponent', () => {
  let component: SelectMuscularGroupComponent;
  let fixture: ComponentFixture<SelectMuscularGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectMuscularGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectMuscularGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
