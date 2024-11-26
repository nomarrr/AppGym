import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientStatsComponent } from './client-stats.component';

describe('ClientStatsComponent', () => {
  let component: ClientStatsComponent;
  let fixture: ComponentFixture<ClientStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
