import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachRecipesComponent } from './coach-recipes.component';

describe('CoachRecipesComponent', () => {
  let component: CoachRecipesComponent;
  let fixture: ComponentFixture<CoachRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachRecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
