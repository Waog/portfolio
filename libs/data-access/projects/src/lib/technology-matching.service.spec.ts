import { TestBed } from '@angular/core/testing';
import { Tag } from '@portfolio/taxonomy';

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
          keywordTag: Tag.get('Angular'),
          searchTag: 'angular',
        })
      ).toBe('full');
      expect(
        service.getMatchType({
          keywordTag: Tag.get('angular'),
          searchTag: 'Angular',
        })
      ).toBe('full');
    });

    it('should return full match for taxonomically similar items', () => {
      expect(
        service.getMatchType({
          keywordTag: Tag.get('TS'),
          searchTag: 'TypeScript',
        })
      ).toBe('full');
      expect(
        service.getMatchType({
          keywordTag: Tag.get('TypeScript'),
          searchTag: 'TS',
        })
      ).toBe('full');
    });

    it('should return indirect for taxonomic siblings', () => {
      expect(
        service.getMatchType({
          keywordTag: Tag.get('Angular'),
          searchTag: 'react',
        })
      ).toBe('indirect');
      expect(
        service.getMatchType({
          keywordTag: Tag.get('React'),
          searchTag: 'angular.js',
        })
      ).toBe('indirect');
    });

    it('should return none for two taxonomically distinct tags', () => {
      expect(
        service.getMatchType({
          keywordTag: Tag.get('Angular Material'),
          searchTag: 'React Web',
        })
      ).toBe('none');
      expect(
        service.getMatchType({
          keywordTag: Tag.get('React Web'),
          searchTag: 'Angular Material',
        })
      ).toBe('none');
    });

    it('should return none for one taxonomic and one unknown distinct tags', () => {
      expect(
        service.getMatchType({
          keywordTag: Tag.get('Angular Material'),
          searchTag: 'Unknown Tech',
        })
      ).toBe('none');
      expect(
        service.getMatchType({
          keywordTag: Tag.get('Unknown Tech'),
          searchTag: 'Angular Material',
        })
      ).toBe('none');
    });

    it('should return none for unknown non-matches (fallback, no string matching)', () => {
      expect(
        service.getMatchType({
          keywordTag: Tag.get('Unknown Tech'),
          searchTag: 'Special Framework',
        })
      ).toBe('none');
      expect(
        service.getMatchType({
          keywordTag: Tag.get('Special Framework'),
          searchTag: 'Unknown Tech',
        })
      ).toBe('none');
    });

    it('should return full match for taxonomically included items', () => {
      expect(
        service.getMatchType({
          keywordTag: Tag.get('Angular'),
          searchTag: 'HTML',
        })
      ).toBe('full');
    });

    it('should return full match for taxonomically indirectly included items', () => {
      expect(
        service.getMatchType({
          keywordTag: Tag.get('React Web'),
          searchTag: 'JavaScript',
        })
      ).toBe('full');
    });

    it('should return indirect match for taxonomically related items', () => {
      expect(
        service.getMatchType({
          keywordTag: Tag.get('Angular'),
          searchTag: 'RxJS',
        })
      ).toBe('indirect');
    });
  });

  describe('getBestMatchTypeForSearchTag', () => {
    it('should return full when any tag has full match', () => {
      const result = service.getBestMatchTypeForSearchTag({
        searchTag: 'Angular',
        keywordTags: [Tag.get('react'), Tag.get('angular'), Tag.get('vue')],
      });
      expect(result).toBe('full');
    });

    it('should return indirect when no full match but has indirect', () => {
      const result = service.getBestMatchTypeForSearchTag({
        searchTag: 'Angular 13',
        keywordTags: [Tag.get('react'), Tag.get('vue')],
      });
      expect(result).toBe('indirect');
    });

    it('should return none when no matches', () => {
      const result = service.getBestMatchTypeForSearchTag({
        searchTag: 'HTML',
        keywordTags: [Tag.get('Java'), Tag.get('CSS'), Tag.get('AWS')],
      });
      expect(result).toBe('none');
    });

    it('should prefer full over indirect matches', () => {
      const result = service.getBestMatchTypeForSearchTag({
        searchTag: 'Angular',
        keywordTags: [Tag.get('Angular'), Tag.get('React')],
      });
      expect(result).toBe('full');
    });

    it('should regard direct descendants of Search Term as full match', () => {
      const result = service.getBestMatchTypeForSearchTag({
        searchTag: 'JavaScript',
        keywordTags: [Tag.get('TypeScript')],
      });
      expect(result).toBe('full');
    });
  });

  describe('getBestMatchTypeForKeywordTag', () => {
    it('should return full when any tag has full match', () => {
      const result = service.getBestMatchTypeForKeywordTag({
        keywordTag: Tag.get('Angular'),
        searchTags: ['angular', 'java', 'aws'],
      });
      expect(result).toBe('full');
    });

    it('should return indirect when no full match but has indirect', () => {
      const result = service.getBestMatchTypeForKeywordTag({
        keywordTag: Tag.get('Angular'),
        searchTags: ['react', 'vue'],
      });
      expect(result).toBe('indirect');
    });

    it('should return none when no matches', () => {
      const result = service.getBestMatchTypeForKeywordTag({
        keywordTag: Tag.get('Cordova'),
        searchTags: ['Java', 'CSS', 'AWS'],
      });
      expect(result).toBe('none');
    });

    it('should prefer full over indirect matches', () => {
      const result = service.getBestMatchTypeForKeywordTag({
        keywordTag: Tag.get('Angular'),
        searchTags: ['Angular', 'React'],
      });
      expect(result).toBe('full');
    });

    it('should regard direct descendants of Search Term as full match', () => {
      const result = service.getBestMatchTypeForKeywordTag({
        keywordTag: Tag.get('TypeScript'),
        searchTags: ['JavaScript'],
      });
      expect(result).toBe('full');
    });
  });
});
