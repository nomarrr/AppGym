import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWeightComponent } from './user-weight.component';

describe('UserWeightComponent', () => {
  let component: UserWeightComponent;
  let fixture: ComponentFixture<UserWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
