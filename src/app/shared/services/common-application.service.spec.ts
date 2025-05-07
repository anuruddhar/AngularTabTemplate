import { TestBed } from '@angular/core/testing';

import { CommonApplicationService } from './common-application.service';

describe('CommonApplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonApplicationService = TestBed.inject(CommonApplicationService);
    expect(service).toBeTruthy();
  });
});
