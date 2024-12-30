import { TestBed } from '@angular/core/testing';

import { RegisServiceService } from './regis-service.service';

describe('RegisServiceService', () => {
  let service: RegisServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
