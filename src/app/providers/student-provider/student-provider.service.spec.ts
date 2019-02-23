import { TestBed } from '@angular/core/testing';

import { StudentProviderService } from './student-provider.service';

describe('StudentProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentProviderService = TestBed.get(StudentProviderService);
    expect(service).toBeTruthy();
  });
});
