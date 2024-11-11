import { TestBed } from '@angular/core/testing';

import { AuthGard } from './auth.service';

describe('AuthService', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
