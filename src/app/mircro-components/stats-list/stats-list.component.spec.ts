import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsListComponent } from './stats-list.component';

describe('StatsListComponent', () => {
  let component: StatsListComponent;
  let fixture: ComponentFixture<StatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
