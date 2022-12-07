import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaaperturaFormComponent } from './diaapertura-form.component';

describe('DiaaperturaFormComponent', () => {
  let component: DiaaperturaFormComponent;
  let fixture: ComponentFixture<DiaaperturaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaaperturaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaaperturaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
