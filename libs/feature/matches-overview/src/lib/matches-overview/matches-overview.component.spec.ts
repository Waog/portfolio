import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CustomizationStateService } from '@portfolio/customization-state';
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
  let customizationStateService: CustomizationStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchesOverviewComponent],
      providers: [
        { provide: SearchTagService, useValue: mockSearchTagService },
        { provide: SearchEngineService, useValue: mockSearchEngineService },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesOverviewComponent);
    component = fixture.componentInstance;
    customizationStateService = TestBed.inject(CustomizationStateService);
    customizationStateService.setSkillMatrixExperienceUnit('project-count');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display matches overview when tags are present', () => {
    mockSearchTagService.tags$.next(['Angular', 'TypeScript', 'Tailwind']);
    mockSearchEngineService.searchResult$.next({
      loading: false,
      ui: {
        matchesOverview: [
          {
            keyword: 'Angular',
            fullMatchesCount: 2,
            partialMatchesCount: 1,
            fullMatchesTotalDurationInMs: 120,
            partialMatchesTotalDurationInMs: 30,
            fullMatchesTotalDurationText: '2h',
            partialMatchesTotalDurationText: '30m',
            allMatchesTotalDurationText: '2h 30m',
          },
          {
            keyword: 'TypeScript',
            fullMatchesCount: 3,
            partialMatchesCount: 2,
            fullMatchesTotalDurationInMs: 180,
            partialMatchesTotalDurationInMs: 60,
            fullMatchesTotalDurationText: '3h',
            partialMatchesTotalDurationText: '1h',
            allMatchesTotalDurationText: '4h',
          },
          {
            keyword: 'Tailwind',
            fullMatchesCount: 0,
            partialMatchesCount: 11,
            fullMatchesTotalDurationInMs: 0,
            partialMatchesTotalDurationInMs: 330,
            fullMatchesTotalDurationText: '0m',
            partialMatchesTotalDurationText: '5h 30m',
            allMatchesTotalDurationText: '5h 30m',
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
    expect(text).toContain('Tailwind:');
    expect(text).toContain('2 projects');
    expect(text).toContain('1 related');
    expect(text).toContain('3 projects');
    expect(text).toContain('2 related');
    expect(text).toContain('11 related projects');
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

  it('should add the asterisk and note for the time unit', () => {
    customizationStateService.setSkillMatrixExperienceUnit('time');
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Experience by Keywords*');
    expect(text).toMatch(/exact matches are shown in green/i);
    expect(text).toMatch(/broader experience/i);
    expect(text).toMatch(/similar, comparable, or related technologies/i);
  });
});
