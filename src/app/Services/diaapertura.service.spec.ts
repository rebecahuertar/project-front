import { TestBed } from '@angular/core/testing';

import { DiaaperturaService } from './diaapertura.service';

describe('DiaaperturaService', () => {
  let service: DiaaperturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiaaperturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
