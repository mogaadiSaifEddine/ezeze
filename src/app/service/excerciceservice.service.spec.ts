import { TestBed } from '@angular/core/testing';

import { ExcerciceserviceService } from './excerciceservice.service';

describe('ExcerciceserviceService', () => {
  let service: ExcerciceserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcerciceserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
