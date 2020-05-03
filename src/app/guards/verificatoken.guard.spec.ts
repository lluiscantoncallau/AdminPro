import { TestBed, async, inject } from '@angular/core/testing';

import { VerificatokenGuard } from './verificatoken.guard';

describe('VerificatokenGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerificatokenGuard]
    });
  });

  it('should ...', inject([VerificatokenGuard], (guard: VerificatokenGuard) => {
    expect(guard).toBeTruthy();
  }));
});

