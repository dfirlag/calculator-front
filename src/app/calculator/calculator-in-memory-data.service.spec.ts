import { TestBed } from '@angular/core/testing';

import { CalculatorInMemoryDataService } from './calculator-in-memory-data.service';

describe('CalculatorInMemoryDataService', () => {
  let service: CalculatorInMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorInMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
