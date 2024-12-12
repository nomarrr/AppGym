import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientList2Component } from './admin-client-list2.component';

describe('AdminClientList2Component', () => {
  let component: AdminClientList2Component;
  let fixture: ComponentFixture<AdminClientList2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminClientList2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminClientList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
