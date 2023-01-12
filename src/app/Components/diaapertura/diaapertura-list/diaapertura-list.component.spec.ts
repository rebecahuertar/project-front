import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaaperturaListComponent } from './diaapertura-list.component';

describe('DiaaperturaListComponent', () => {
  let component: DiaaperturaListComponent;
  let fixture: ComponentFixture<DiaaperturaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiaaperturaListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiaaperturaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
