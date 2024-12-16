import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRecipeCardComponent } from './client-recipe-card.component';

describe('ClientRecipeCardComponent', () => {
  let component: ClientRecipeCardComponent;
  let fixture: ComponentFixture<ClientRecipeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientRecipeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientRecipeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
