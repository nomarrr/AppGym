import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedClientsComponent } from './unassigned-clients.component';

describe('UnassignedClientsComponent', () => {
  let component: UnassignedClientsComponent;
  let fixture: ComponentFixture<UnassignedClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnassignedClientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnassignedClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
