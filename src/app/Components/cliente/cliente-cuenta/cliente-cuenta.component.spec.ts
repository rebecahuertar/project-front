import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteCuentaComponent } from './cliente-cuenta.component';

describe('ClienteCuentaComponent', () => {
  let component: ClienteCuentaComponent;
  let fixture: ComponentFixture<ClienteCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteCuentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
