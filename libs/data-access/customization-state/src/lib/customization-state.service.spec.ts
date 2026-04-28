import 'jest-expect-message';

import { TestBed } from '@angular/core/testing';

import { CustomizationStateService } from './customization-state.service';

describe('CustomizationStateService', () => {
  let service: CustomizationStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomizationStateService],
    });

    service = TestBed.inject(CustomizationStateService);
  });

  it('can create', () => {
    expect(service).toBeInstanceOf(CustomizationStateService);
  });
});
