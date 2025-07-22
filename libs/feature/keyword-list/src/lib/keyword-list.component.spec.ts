import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnologyMatchingService } from '@portfolio/projects';
import { Tag } from '@portfolio/taxonomy';

import { KeywordListComponent } from './keyword-list.component';

describe('KeywordListComponent', () => {
  let component: KeywordListComponent;
  let fixture: ComponentFixture<KeywordListComponent>;
  let mockTechnologyMatchingService: jest.Mocked<TechnologyMatchingService>;

  const mockTags = [Tag.get('Angular'), Tag.get('TypeScript')];

  beforeEach(async () => {
    const mockTechnologyMatchingServiceObj = {
      getBestMatchTypeForKeywordTag: jest.fn(),
      getMatchType: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [KeywordListComponent],
      providers: [
        {
          provide: TechnologyMatchingService,
          useValue: mockTechnologyMatchingServiceObj,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(KeywordListComponent);
    component = fixture.componentInstance;
    mockTechnologyMatchingService = TestBed.inject(
      TechnologyMatchingService
    ) as jest.Mocked<TechnologyMatchingService>;

    // Set the required input before detectChanges
    fixture.componentRef.setInput('keywordTags', mockTags);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('technologies getter', () => {
    it('should return keywords with match types', () => {
      mockTechnologyMatchingService.getBestMatchTypeForKeywordTag.mockImplementation(
        ({ keywordTag }: { keywordTag: Tag }) => {
          switch (keywordTag) {
            case Tag.get('Angular'):
              return 'full';
            case Tag.get('TypeScript'):
              return 'indirect';
            default:
              return 'none';
          }
        }
      );

      const tagsWithMatchType = component.tagsWithMatchType;

      expect(tagsWithMatchType).toEqual([
        { tag: Tag.get('Angular'), matchType: 'full' },
        { tag: Tag.get('TypeScript'), matchType: 'indirect' },
      ]);
      expect(
        mockTechnologyMatchingService.getBestMatchTypeForKeywordTag
      ).toHaveBeenCalledWith({ keywordTag: Tag.get('Angular') });
      expect(
        mockTechnologyMatchingService.getBestMatchTypeForKeywordTag
      ).toHaveBeenCalledWith({ keywordTag: Tag.get('TypeScript') });
    });
  });

  describe('keyword categorization', () => {
    beforeEach(() => {
      mockTechnologyMatchingService.getBestMatchTypeForKeywordTag.mockImplementation(
        ({ keywordTag }: { keywordTag: Tag }) => {
          switch (keywordTag) {
            case Tag.get('Angular'):
              return 'full';
            case Tag.get('TypeScript'):
              return 'indirect';
            default:
              return 'none';
          }
        }
      );
    });

    describe('greenTechnologies', () => {
      it('should return keywords with full match', () => {
        const greenKeywords = component.greenTechnologies;
        expect(greenKeywords).toEqual(['Angular']);
      });
    });

    describe('yellowTechnologies', () => {
      it('should return keywords with indirect match', () => {
        const yellowKeywords = component.yellowTechnologies;
        expect(yellowKeywords).toEqual(['TypeScript']);
      });
    });

    describe('grayTechnologies', () => {
      it('should return keywords with no match', () => {
        // Update the mock to return 'none' for both keywords
        mockTechnologyMatchingService.getBestMatchTypeForKeywordTag.mockReturnValue(
          'none'
        );

        const grayKeywords = component.grayTechnologies;
        expect(grayKeywords).toEqual(['Angular', 'TypeScript']);
      });
    });
  });
});
