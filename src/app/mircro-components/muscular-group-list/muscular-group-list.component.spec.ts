import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscularGroupListComponent } from './muscular-group-list.component';

describe('MuscularGroupListComponent', () => {
  let component: MuscularGroupListComponent;
  let fixture: ComponentFixture<MuscularGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscularGroupListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuscularGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
