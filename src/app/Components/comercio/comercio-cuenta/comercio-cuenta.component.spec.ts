import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercioCuentaComponent } from './comercio-cuenta.component';

describe('ComercioCuentaComponent', () => {
  let component: ComercioCuentaComponent;
  let fixture: ComponentFixture<ComercioCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComercioCuentaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComercioCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
