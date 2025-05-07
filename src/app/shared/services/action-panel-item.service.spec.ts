import { TestBed } from '@angular/core/testing';

import { ActionPanelItemService } from './action-panel-item.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';

describe('ActionPanelItemService', () => {
  let service: ActionPanelItemService;
  let mockAuthorizationService;
  beforeEach(() => {
    mockAuthorizationService = jasmine.createSpyObj(['isAuthorized']);
    TestBed.configureTestingModule({
      providers: [
        ActionPanelItemService,
        { provide: AuthorizationService, useValue: mockAuthorizationService }
      ]
    });
    service = TestBed.inject(ActionPanelItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
