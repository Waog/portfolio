import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { TechnologyMatchingService } from '@portfolio/projects';
import { SearchTagService } from '@portfolio/search-tags';
import { Tag } from '@portfolio/taxonomy';
import { Observable, Subject } from 'rxjs';

import { KeywordListComponent } from './keyword-list.component';

describe('KeywordListComponent', () => {
  let component: KeywordListComponent;
  let fixture: ComponentFixture<KeywordListComponent>;
  let mockTechnologyMatchingService: jest.Mocked<TechnologyMatchingService>;
  let mockSearchTagService: { tags$: Observable<string[]> };
  let tagsSubject: Subject<string[]>;

  const mockTags = [Tag.get('Angular'), Tag.get('TypeScript'), Tag.get('AWS')];

  beforeEach(async () => {
    const mockTechnologyMatchingServiceObj = {
      getBestMatchTypeForKeywordTag: jest.fn(),
      getMatchType: jest.fn(),
    };
    tagsSubject = new Subject<string[]>();
    mockSearchTagService = {
      tags$: tagsSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      imports: [KeywordListComponent],
      providers: [
        {
          provide: TechnologyMatchingService,
          useValue: mockTechnologyMatchingServiceObj,
        },
        {
          provide: SearchTagService,
          useValue: mockSearchTagService,
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

  describe('tagsWithMatchType', () => {
    it('should update when tags$ emits', fakeAsync(() => {
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

      // Before emission, should be empty
      expect(component.tagsWithMatchType).toEqual([]);

      tagsSubject.next([]); // simulate tags$ emission
      tick(); // allow deferred update (setTimeout) to run
      fixture.detectChanges();

      expect(component.tagsWithMatchType).toEqual([
        { tag: Tag.get('Angular'), matchType: 'full' },
        { tag: Tag.get('TypeScript'), matchType: 'indirect' },
        { tag: Tag.get('AWS'), matchType: 'none' },
      ]);
      expect(component.greenTechnologies).toEqual(['Angular']);
      expect(component.yellowTechnologies).toEqual(['TypeScript']);
      expect(component.grayTechnologies).toEqual(['AWS']);
      expect(
        mockTechnologyMatchingService.getBestMatchTypeForKeywordTag
      ).toHaveBeenCalledWith({
        keywordTag: Tag.get('Angular'),
        searchTags: [],
      });
      expect(
        mockTechnologyMatchingService.getBestMatchTypeForKeywordTag
      ).toHaveBeenCalledWith({
        keywordTag: Tag.get('TypeScript'),
        searchTags: [],
      });
    }));
  });
});
