import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeClienteComponent } from './mensaje-cliente.component';

describe('MensajeClienteComponent', () => {
  let component: MensajeClienteComponent;
  let fixture: ComponentFixture<MensajeClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MensajeClienteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MensajeClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
