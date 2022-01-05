import { TestBed } from '@angular/core/testing';

import { RequeteHTTPService } from './requete-http.service';

describe('RequeteHTTPService', () => {
  let service: RequeteHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequeteHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
