import { TestBed } from '@angular/core/testing';

import { TechnologyMatchingService } from './technology-matching.service';

describe('TechnologyMatchingService', () => {
  let service: TechnologyMatchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnologyMatchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMatchType', () => {
    it('should return full match for exact case-insensitive matches', () => {
      expect(service.getMatchType('Angular', 'angular')).toBe('full');
      expect(service.getMatchType('angular', 'Angular')).toBe('full');
      expect(service.getMatchType('ANGULAR', 'angular')).toBe('full');
    });

    it('should return indirect match for substring matches', () => {
      expect(service.getMatchType('Angular 13', 'angular')).toBe('indirect');
      expect(service.getMatchType('angular', 'Angular 13')).toBe('indirect');
      expect(service.getMatchType('React Native', 'react')).toBe('indirect');
    });

    it('should return none for no matches', () => {
      expect(service.getMatchType('Angular', 'react')).toBe('none');
      expect(service.getMatchType('TypeScript', 'java')).toBe('none');
    });
  });

  describe('getBestMatchType', () => {
    it('should return full when any tag has full match', () => {
      const result = service.getBestMatchType('Angular', [
        'react',
        'angular',
        'vue',
      ]);
      expect(result).toBe('full');
    });

    it('should return indirect when no full match but has indirect', () => {
      const result = service.getBestMatchType('Angular 13', [
        'react',
        'angular',
        'vue',
      ]);
      expect(result).toBe('indirect');
    });

    it('should return none when no matches', () => {
      const result = service.getBestMatchType('Angular', [
        'react',
        'vue',
        'svelte',
      ]);
      expect(result).toBe('none');
    });

    it('should prefer full over indirect matches', () => {
      const result = service.getBestMatchType('Angular', [
        'Angular 13',
        'angular',
      ]);
      expect(result).toBe('full');
    });
  });
});
