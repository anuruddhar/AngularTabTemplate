import { TestBed } from '@angular/core/testing';

import { GlobalChangeNotifierService } from './global-change-notifier.service';

describe('globalChangeNotifierService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [GlobalChangeNotifierService]
    })
  );

  it('should be created', () => {
    const service: GlobalChangeNotifierService = TestBed.inject(GlobalChangeNotifierService);
    expect(service).toBeTruthy();
  });
});
