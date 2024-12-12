import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMembershipUserComponent } from './add-membership-user.component';

describe('AddMembershipUserComponent', () => {
  let component: AddMembershipUserComponent;
  let fixture: ComponentFixture<AddMembershipUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMembershipUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMembershipUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
