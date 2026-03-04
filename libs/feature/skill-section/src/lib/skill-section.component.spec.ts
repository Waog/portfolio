import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import {
  SearchEngineService,
  type SearchResult,
} from '@portfolio/search-engine-angular';
import type { Project as SearchEngineProject } from '@portfolio/search-engine-domain';
import { BehaviorSubject } from 'rxjs';

import { SkillSectionComponent } from './skill-section.component';

jest.mock('@portfolio/search-engine-angular', () => ({
  SearchEngineService: class {
    searchResult$ = new BehaviorSubject({
      loading: false,
      ui: {
        matchesOverview: [],
        projects: [],
        skills: [],
      },
      ngService: {
        loading: false,
        progressPercent: 100,
      },
    });
  },
}));

describe('SkillSectionComponent', () => {
  let component: SkillSectionComponent;
  let fixture: ComponentFixture<SkillSectionComponent>;
  let searchResultSubject: BehaviorSubject<SearchResult>;

  function createSearchResult(overrides?: Partial<SearchResult>): SearchResult {
    return {
      loading: false,
      ui: {
        matchesOverview: [],
        projects: [] as SearchEngineProject[],
        skills: [
          {
            category: 'Frontend',
            tagLists: {
              fullMatches: ['Angular', 'TypeScript'],
              partialMatches: ['React'],
              nonMatches: [],
            },
            rankingScore: 100,
          },
          {
            category: 'Backend',
            tagLists: {
              fullMatches: ['Node.js', 'Java'],
              partialMatches: ['Spring Boot'],
              nonMatches: [],
            },
            rankingScore: 90,
          },
          {
            category: 'Concepts',
            tagLists: {
              fullMatches: ['REST', 'Agile'],
              partialMatches: [],
              nonMatches: [],
            },
            rankingScore: 80,
          },
        ],
      },
      ngService: {
        loading: false,
        progressPercent: 100,
      },
      ...overrides,
    };
  }

  beforeEach(async () => {
    searchResultSubject = new BehaviorSubject<SearchResult>(
      createSearchResult()
    );

    await TestBed.configureTestingModule({
      imports: [SkillSectionComponent, MatCardModule, MatIconModule],
      providers: [
        {
          provide: SearchEngineService,
          useValue: { searchResult$: searchResultSubject.asObservable() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with skill categories from all projects and additional keywords from service itself', () => {
    const categoryElements = fixture.debugElement.queryAll(
      By.css('.skill-category:not(.and-more)')
    );
    expect(categoryElements.length).toBe(3);
  });

  it('should render the card title', () => {
    const cardTitle = fixture.debugElement.query(By.css('lib-section-header'));
    expect(cardTitle).toBeTruthy();
    expect(cardTitle.nativeElement.textContent).toContain('Skills');
  });

  it('should render all skill categories in screen mode', () => {
    const categoryElements = fixture.debugElement.queryAll(
      By.css('.skill-category:not(.and-more)')
    );
    expect(categoryElements.length).toBe(3);
  });

  it('should render category titles correctly', () => {
    const categoryElements = fixture.debugElement.queryAll(
      By.css('.skill-category:not(.and-more)')
    );
    expect(categoryElements.length).toBe(3);
    const categoryTitles = categoryElements.map(el =>
      el.nativeElement.textContent.trim()
    );
    expect(categoryTitles).toContain('Frontend:');
    expect(categoryTitles).toContain('Backend:');
    expect(categoryTitles).toContain('Concepts:');
  });

  it('should render `and more...` in print mode', () => {
    const categoryElements = fixture.debugElement.queryAll(
      By.css('.skill-category.and-more')
    );
    expect(categoryElements.length).toBe(1);
    expect(categoryElements[0].nativeElement.textContent.trim()).toBe(
      'and more...'
    );
  });

  it('should pass keywords to keyword-list components', () => {
    const keywordListElements = fixture.debugElement.queryAll(
      By.css('lib-color-chip-list.skill-category-content:not(.and-more)')
    );
    expect(keywordListElements.length).toBe(3);

    expect(keywordListElements[0]).toBeTruthy();
    expect(keywordListElements[1]).toBeTruthy();
    expect(keywordListElements[2]).toBeTruthy();
  });

  describe('Service Integration', () => {
    it('should update rendered categories when service emits new values', () => {
      searchResultSubject.next(
        createSearchResult({
          ui: {
            matchesOverview: [],
            projects: [] as SearchEngineProject[],
            skills: [
              {
                category: 'Frontend',
                tagLists: {
                  fullMatches: ['Angular'],
                  partialMatches: [],
                  nonMatches: [],
                },
                rankingScore: 100,
              },
            ],
          },
        })
      );
      fixture.detectChanges();

      const categoryElements = fixture.debugElement.queryAll(
        By.css('.skill-category:not(.and-more)')
      );
      expect(categoryElements.length).toBe(1);
      expect(categoryElements[0].nativeElement.textContent.trim()).toBe(
        'Frontend:'
      );
    });
  });
});
