import { TestBed } from '@angular/core/testing';

import { TechProjectMatchingService } from './tech-project-matching.service';

describe('TechProjectMatchingService', () => {
  let service: TechProjectMatchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechProjectMatchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct matches for Angular', () => {
    const matches = service.getProjectMatchesForTag('Angular');
    expect(matches.fullMatches).toBeGreaterThan(0);
    expect(matches.partialMatches).toBeGreaterThanOrEqual(0);
    expect(matches.totalProjects).toBeGreaterThan(0);
  });

  it('should return no matches for non-existent technology', () => {
    const matches = service.getProjectMatchesForTag('NonExistentTech');
    expect(matches.fullMatches).toBe(0);
    expect(matches.partialMatches).toBe(0);
    expect(matches.totalProjects).toBeGreaterThan(0);
  });

  it('should handle case insensitive matching', () => {
    const matchesLower = service.getProjectMatchesForTag('angular');
    const matchesUpper = service.getProjectMatchesForTag('ANGULAR');

    expect(matchesLower.fullMatches).toEqual(matchesUpper.fullMatches);
    expect(matchesLower.partialMatches).toEqual(matchesUpper.partialMatches);
  });
});
