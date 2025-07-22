import { TestBed } from '@angular/core/testing';
import { SearchTagService } from '@portfolio/search-tags';
import { Category, Tag } from '@portfolio/taxonomy';

import { SkillSectionService } from './skill-section.service';

describe('SkillSectionService', () => {
  let service: SkillSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SkillSectionService,
        {
          provide: SearchTagService,
          useValue: {
            currentTags: ['Angular', 'React', 'AWS'],
          },
        },
      ],
    });

    service = TestBed.inject(SkillSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sortCategoriesByMatchCount', () => {
    it('should sort categories with more matching tags first', () => {
      const unsortedCategories = new Map([
        ['Backend', [Tag.get('Java'), Tag.get('Spring Boot')]],
        ['Cloud & Infrastructure', [Tag.get('AWS'), Tag.get('Docker')]],
        ['Frontend', [Tag.get('Angular'), Tag.get('React'), Tag.get('CSS')]],
      ]) as Map<Category, Tag[]>;

      const searchTags = ['Angular', 'React Web', 'AWS'];

      const result = service.sortCategoriesByMatchCount({
        unsortedCategories,
        searchTags,
      });

      expect(Array.from(result.entries())).toEqual([
        ['Frontend', [Tag.get('Angular'), Tag.get('React'), Tag.get('CSS')]],
        ['Cloud & Infrastructure', [Tag.get('AWS'), Tag.get('Docker')]],
        ['Backend', [Tag.get('Java'), Tag.get('Spring Boot')]],
      ]);
    });
  });
});
