import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientStatsComponent } from './view-client-stats.component';

describe('ViewClientStatsComponent', () => {
  let component: ViewClientStatsComponent;
  let fixture: ComponentFixture<ViewClientStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewClientStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClientStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
