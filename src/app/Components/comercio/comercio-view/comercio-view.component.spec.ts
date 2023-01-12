import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercioViewComponent } from './comercio-view.component';

describe('ComercioViewComponent', () => {
  let component: ComercioViewComponent;
  let fixture: ComponentFixture<ComercioViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComercioViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComercioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
