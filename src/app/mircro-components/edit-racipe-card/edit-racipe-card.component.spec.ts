import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRacipeCardComponent } from './edit-racipe-card.component';

describe('EditRacipeCardComponent', () => {
  let component: EditRacipeCardComponent;
  let fixture: ComponentFixture<EditRacipeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRacipeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRacipeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
