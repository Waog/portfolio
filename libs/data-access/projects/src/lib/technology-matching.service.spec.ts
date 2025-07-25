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
    });

    it('should return full match for taxonomically similar items', () => {
      expect(
        service.getMatchType({
          keywordTag: Tag.get('TypeScript'),
          searchTag: 'TS',
        })
      ).toBe('full');
    });

    it('should return indirect for taxonomic children', () => {
      expect(
        service.getMatchType({
          keywordTag: Tag.get('React'),
          searchTag: 'React Native',
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
        keywordTags: [Tag.get('React'), Tag.get('Angular'), Tag.get('Vue.js')],
      });
      expect(result).toBe('full');
    });

    it('should return indirect when no full match but has indirect', () => {
      const result = service.getBestMatchTypeForSearchTag({
        searchTag: 'React Native',
        keywordTags: [Tag.get('React'), Tag.get('Vue.js')],
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
        keywordTag: Tag.get('React Native'),
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
  });

  describe('getMatchCount', () => {
    it('should return the correct number of matches', () => {
      const result = service.getMatchCount({
        keywordTags: [Tag.get('Angular'), Tag.get('React'), Tag.get('AWS')],
        searchTags: ['AWS', 'React Native'],
      });
      expect(result).toEqual({ full: 1, indirect: 1, none: 1 });
    });

    it('should not only count multiple matches on the same keyword once', () => {
      const result = service.getMatchCount({
        keywordTags: [Tag.get('React')],
        searchTags: ['React', 'React Native', 'React', 'React Web'],
      });
      expect(result).toEqual({ full: 1, indirect: 0, none: 0 });
    });
  });
});
