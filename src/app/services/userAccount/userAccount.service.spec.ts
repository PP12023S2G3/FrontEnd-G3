import { TestBed } from '@angular/core/testing';

import {UserAccountService } from './userAccount.service';

describe('ResultService', () => {
  let service: UserAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
