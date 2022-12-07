import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeFormComponent } from './mensaje-form.component';

describe('MensajeFormComponent', () => {
  let component: MensajeFormComponent;
  let fixture: ComponentFixture<MensajeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
