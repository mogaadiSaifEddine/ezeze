import { TestBed } from '@angular/core/testing';

import { ChapitreServiceService } from './chapitre-service.service';

describe('ChapitreServiceService', () => {
  let service: ChapitreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChapitreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
