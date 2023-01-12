import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorListComponent } from './buscador-list.component';

describe('BuscadorListComponent', () => {
  let component: BuscadorListComponent;
  let fixture: ComponentFixture<BuscadorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
