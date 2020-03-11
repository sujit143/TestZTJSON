import { TestBed } from '@angular/core/testing';

import { AppservicesService } from './appservices.service';

describe('AppservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppservicesService = TestBed.get(AppservicesService);
    expect(service).toBeTruthy();
  });
});
