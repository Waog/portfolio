import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  SearchEngineService,
  type SearchResult,
} from '@portfolio/search-engine-angular';
import type { Project as SearchEngineProject } from '@portfolio/search-engine-domain';
import { SearchTagService } from '@portfolio/search-tags';
import { BehaviorSubject } from 'rxjs';

import { MatchesOverviewComponent } from './matches-overview.component';

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

// Mock SearchTagService
const mockSearchTagService = {
  tags$: new BehaviorSubject<string[]>([]),
};

// Mock SearchEngineService
const mockSearchEngineService = {
  searchResult$: new BehaviorSubject<SearchResult>({
    loading: false,
    ui: {
      matchesOverview: [],
      projects: [] as SearchEngineProject[],
      skills: [],
    },
    ngService: {
      loading: false,
      progressPercent: 100,
    },
  }),
};

describe('MatchesOverviewComponent', () => {
  let component: MatchesOverviewComponent;
  let fixture: ComponentFixture<MatchesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchesOverviewComponent],
      providers: [
        { provide: SearchTagService, useValue: mockSearchTagService },
        { provide: SearchEngineService, useValue: mockSearchEngineService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display matches overview when tags are present', () => {
    mockSearchTagService.tags$.next(['Angular', 'TypeScript']);
    mockSearchEngineService.searchResult$.next({
      loading: false,
      ui: {
        matchesOverview: [
          { keyword: 'Angular', fullMatchesCount: 2, partialMatchesCount: 1 },
          {
            keyword: 'TypeScript',
            fullMatchesCount: 3,
            partialMatchesCount: 2,
          },
        ],
        projects: [] as SearchEngineProject[],
        skills: [],
      },
      ngService: {
        loading: false,
        progressPercent: 100,
      },
    });
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Angular:');
    expect(text).toContain('TypeScript:');
    expect(text).toContain('2 projects');
    expect(text).toContain('1 related project');
    expect(text).toContain('3 projects');
    expect(text).toContain('2 related projects');
  });

  it('should not display anything when no tags are present', () => {
    mockSearchTagService.tags$.next([]);
    mockSearchEngineService.searchResult$.next({
      loading: false,
      ui: {
        matchesOverview: [],
        projects: [] as SearchEngineProject[],
        skills: [],
      },
      ngService: {
        loading: false,
        progressPercent: 100,
      },
    });
    fixture.detectChanges();

    const tags = fixture.nativeElement.querySelectorAll('.search-term');
    expect(tags.length).toBe(0);
  });
});
