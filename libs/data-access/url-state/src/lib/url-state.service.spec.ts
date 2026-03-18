import 'jest-expect-message';

import { TestBed } from '@angular/core/testing';

import { UrlStateService } from './url-state.service';

describe('UrlStateService', () => {
  let service: UrlStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlStateService],
    });

    service = TestBed.inject(UrlStateService);
  });

  it('can create', () => {
    expect(service).toBeInstanceOf(UrlStateService);
  });
});
