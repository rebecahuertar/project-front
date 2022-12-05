import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeComercioComponent } from './mensaje-comercio.component';

describe('MensajeComercioComponent', () => {
  let component: MensajeComercioComponent;
  let fixture: ComponentFixture<MensajeComercioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeComercioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajeComercioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
