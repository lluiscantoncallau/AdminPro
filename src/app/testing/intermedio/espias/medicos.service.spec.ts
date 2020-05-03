import { TestBed, inject } from '@angular/core/testing';

import { MedicosTestService } from './medicos.service';

describe('MedicosTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicosTestService]
    });
  });

  it('should be created', inject([MedicosTestService], (service: MedicosTestService) => {
    expect(service).toBeTruthy();
  }));
});