import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachMyRecipeListComponent } from './coach-my-recipe-list.component';

describe('CoachMyRecipeListComponent', () => {
  let component: CoachMyRecipeListComponent;
  let fixture: ComponentFixture<CoachMyRecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachMyRecipeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachMyRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
