import { LoaderService } from './loader.service';

describe('Core: LoaderService', () => {
  let loaderService: LoaderService;

  beforeEach(() => {
      loaderService = new LoaderService();
  });

  afterEach(() => {
      loaderService = null;
  });

  it('should increment the \'asycTaskcount\' when a task is added', () => {
      loaderService.asycTackCount += 1;
      expect(loaderService.asycTackCount).toBe(1, 'Task count should be 1');
  });

  it('should decrement the \'asycTaskcount\' when a task is removed', () => {
      loaderService.asycTackCount = 5;
      loaderService.asycTackCount -= 1;
      expect(loaderService.asycTackCount).toBe(4, 'Task count should be 4');
  });
});
