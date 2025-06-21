import { TestBed } from '@angular/core/testing';
import { SearchTagService } from '@portfolio/search-tags';
import { of } from 'rxjs';

import { ProjectItemTechnologyMatchingService } from './project-item-technology-matching.service';

describe('ProjectItemTechnologyMatchingService', () => {
  let service: ProjectItemTechnologyMatchingService;
  let mockSearchTagService: Partial<SearchTagService> & {
    currentTags: string[];
  };

  beforeEach(() => {
    mockSearchTagService = {
      currentTags: [],
      addTag: jest.fn(),
      removeTag: jest.fn(),
      clearAllTags: jest.fn(),
      hasTag: jest.fn(),
      tags$: of([]),
    };

    TestBed.configureTestingModule({
      providers: [
        ProjectItemTechnologyMatchingService,
        { provide: SearchTagService, useValue: mockSearchTagService },
      ],
    });

    service = TestBed.inject(ProjectItemTechnologyMatchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getMatchType', () => {
    it('should return "none" when no search tags exist', () => {
      mockSearchTagService.currentTags = [];
      expect(service.getMatchType('Angular')).toBe('none');
    });

    it('should return "full" for exact match (case insensitive)', () => {
      mockSearchTagService.currentTags = ['Angular', 'React'];
      expect(service.getMatchType('angular')).toBe('full');
      expect(service.getMatchType('ANGULAR')).toBe('full');
      expect(service.getMatchType('Angular')).toBe('full');
    });

    it('should return "indirect" when search term is contained in technology', () => {
      mockSearchTagService.currentTags = ['Script'];
      expect(service.getMatchType('TypeScript')).toBe('indirect');
      expect(service.getMatchType('JavaScript')).toBe('indirect');
    });

    it('should return "indirect" when technology is contained in search term', () => {
      mockSearchTagService.currentTags = ['JavaScript Framework'];
      expect(service.getMatchType('JavaScript')).toBe('indirect');
    });

    it('should prioritize full match over indirect match', () => {
      mockSearchTagService.currentTags = ['Angular', 'Script'];
      expect(service.getMatchType('Angular')).toBe('full');
    });

    it('should handle case insensitive substring matching', () => {
      mockSearchTagService.currentTags = ['spring'];
      expect(service.getMatchType('Spring Boot')).toBe('indirect');
      expect(service.getMatchType('SPRING FRAMEWORK')).toBe('indirect');
    });

    it('should return "none" for no matches', () => {
      mockSearchTagService.currentTags = ['Angular', 'React'];
      expect(service.getMatchType('Vue')).toBe('none');
      expect(service.getMatchType('Python')).toBe('none');
    });
  });

  describe('addMatchType', () => {
    it('should add match type to technology', () => {
      mockSearchTagService.currentTags = ['Angular'];
      const result = service.addMatchType('Angular');
      expect(result).toEqual({ name: 'Angular', matchType: 'full' });
    });
  });

  describe('addMatchTypes', () => {
    it('should add match types to multiple technologies', () => {
      mockSearchTagService.currentTags = ['Angular', 'Script'];
      const technologies = ['Angular', 'TypeScript', 'Vue'];
      const result = service.addMatchTypes(technologies);

      expect(result).toEqual([
        { name: 'Angular', matchType: 'full' },
        { name: 'TypeScript', matchType: 'indirect' },
        { name: 'Vue', matchType: 'none' },
      ]);
    });
  });
});
