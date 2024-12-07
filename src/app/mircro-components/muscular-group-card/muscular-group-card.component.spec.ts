import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscularGroupCardComponent } from './muscular-group-card.component';

describe('MuscularGroupCardComponent', () => {
  let component: MuscularGroupCardComponent;
  let fixture: ComponentFixture<MuscularGroupCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscularGroupCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuscularGroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
