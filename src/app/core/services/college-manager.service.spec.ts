import { TestBed } from '@angular/core/testing';

import { CollegeManagerService } from './college-manager.service';

describe('CollegeManagerService', () => {
  let service: CollegeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollegeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
