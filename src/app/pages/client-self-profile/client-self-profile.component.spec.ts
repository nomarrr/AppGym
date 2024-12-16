import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSelfProfileComponent } from './client-self-profile.component';

describe('ClientSelfProfileComponent', () => {
  let component: ClientSelfProfileComponent;
  let fixture: ComponentFixture<ClientSelfProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSelfProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientSelfProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
