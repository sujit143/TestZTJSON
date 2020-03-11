import { TestBed } from '@angular/core/testing';

import { KbarticlesService } from './kbarticles.service';

describe('KbarticlesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KbarticlesService = TestBed.get(KbarticlesService);
    expect(service).toBeTruthy();
  });
});
