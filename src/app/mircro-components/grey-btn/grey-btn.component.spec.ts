import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreyBtnComponent } from './grey-btn.component';

describe('GreyBtnComponent', () => {
  let component: GreyBtnComponent;
  let fixture: ComponentFixture<GreyBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreyBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreyBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
