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
      expect(
        service.getMatchType({
          technologyName: 'Angular',
          searchTag: 'angular',
        })
      ).toBe('full');
      expect(
        service.getMatchType({
          technologyName: 'angular',
          searchTag: 'Angular',
        })
      ).toBe('full');
      expect(
        service.getMatchType({
          technologyName: 'ANGULAR',
          searchTag: 'angular',
        })
      ).toBe('full');
    });

    it('should return full match for taxonomically similar items', () => {
      expect(
        service.getMatchType({ technologyName: 'TS', searchTag: 'TypeScript' })
      ).toBe('full');
      expect(
        service.getMatchType({ technologyName: 'TypeScript', searchTag: 'TS' })
      ).toBe('full');
    });

    it('should return indirect match for non-taxonomy (fallback) substring matches', () => {
      expect(
        service.getMatchType({
          technologyName: 'Unknown Tech',
          searchTag: 'tech',
        })
      ).toBe('indirect');
      expect(
        service.getMatchType({
          technologyName: 'Tech',
          searchTag: 'Unknown tech',
        })
      ).toBe('indirect');
    });

    it('should return indirect for taxonomic siblings', () => {
      expect(
        service.getMatchType({ technologyName: 'Angular', searchTag: 'react' })
      ).toBe('indirect');
      expect(
        service.getMatchType({
          technologyName: 'React',
          searchTag: 'angular.js',
        })
      ).toBe('indirect');
    });

    it('should return none for two taxonomically distinct tags', () => {
      expect(
        service.getMatchType({
          technologyName: 'Angular Material',
          searchTag: 'React Web',
        })
      ).toBe('none');
      expect(
        service.getMatchType({
          technologyName: 'React Web',
          searchTag: 'Angular Material',
        })
      ).toBe('none');
    });

    it('should return none for one taxonomic and one unknown distinct tags', () => {
      expect(
        service.getMatchType({
          technologyName: 'Angular Material',
          searchTag: 'Unknown Tech',
        })
      ).toBe('none');
      expect(
        service.getMatchType({
          technologyName: 'Unknown Tech',
          searchTag: 'Angular Material',
        })
      ).toBe('none');
    });

    it('should return none for unknown non-matches (fallback, no string matching)', () => {
      expect(
        service.getMatchType({
          technologyName: 'Unknown Tech',
          searchTag: 'Special Framework',
        })
      ).toBe('none');
      expect(
        service.getMatchType({
          technologyName: 'Special Framework',
          searchTag: 'Unknown Tech',
        })
      ).toBe('none');
    });
  });

  describe('getBestMatchTypeForSearchTag', () => {
    it('should return full when any tag has full match', () => {
      const result = service.getBestMatchTypeForSearchTag({
        searchTag: 'Angular',
        technologyNames: ['react', 'angular', 'vue'],
      });
      expect(result).toBe('full');
    });

    it('should return indirect when no full match but has indirect', () => {
      const result = service.getBestMatchTypeForSearchTag({
        searchTag: 'Angular 13',
        technologyNames: ['react', 'angular', 'vue'],
      });
      expect(result).toBe('indirect');
    });

    it('should return none when no matches', () => {
      const result = service.getBestMatchTypeForSearchTag({
        searchTag: 'HTML',
        technologyNames: ['Java', 'CSS', 'AWS'],
      });
      expect(result).toBe('none');
    });

    it('should prefer full over indirect matches', () => {
      const result = service.getBestMatchTypeForSearchTag({
        searchTag: 'Angular',
        technologyNames: ['Angular', 'React'],
      });
      expect(result).toBe('full');
    });

    it('should regard direct descendants of Search Term as full match', () => {
      const result = service.getBestMatchTypeForSearchTag({
        searchTag: 'JavaScript',
        technologyNames: ['TypeScript'],
      });
      expect(result).toBe('full');
    });
  });

  describe('getBestMatchTypeForTechnology', () => {
    it('should return full when any tag has full match', () => {
      const result = service.getBestMatchTypeForTechnology({
        technologyName: 'Angular',
        searchTags: ['angular', 'java', 'aws'],
      });
      expect(result).toBe('full');
    });

    it('should return indirect when no full match but has indirect', () => {
      const result = service.getBestMatchTypeForTechnology({
        technologyName: 'Angular',
        searchTags: ['react', 'vue'],
      });
      expect(result).toBe('indirect');
    });

    it('should return none when no matches', () => {
      const result = service.getBestMatchTypeForTechnology({
        technologyName: 'Cordova',
        searchTags: ['Java', 'CSS', 'AWS'],
      });
      expect(result).toBe('none');
    });

    it('should prefer full over indirect matches', () => {
      const result = service.getBestMatchTypeForTechnology({
        technologyName: 'Angular',
        searchTags: ['Angular', 'React'],
      });
      expect(result).toBe('full');
    });

    it('should regard direct descendants of Search Term as full match', () => {
      const result = service.getBestMatchTypeForTechnology({
        technologyName: 'TypeScript',
        searchTags: ['JavaScript'],
      });
      expect(result).toBe('full');
    });
  });
});
