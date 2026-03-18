import 'jest-expect-message';

import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { UrlStateService } from './url-state.service';

describe('UrlStateService', () => {
  let service: UrlStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), UrlStateService],
    });

    service = TestBed.inject(UrlStateService);
  });

  it('can create', () => {
    expect(service).toBeInstanceOf(UrlStateService);
  });
});
