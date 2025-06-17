import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import {
  ProjectMatches,
  TechProjectMatchingService,
} from '../services/tech-project-matching.service';
import { MatchesOverviewComponent } from './matches-overview.component';

// Mock SearchTagService
const mockSearchTagService = {
  tags$: new BehaviorSubject<string[]>([]),
};

// Mock TechProjectMatchingService
const mockTechProjectMatchingService = {
  getProjectMatchesForTag: jest.fn().mockReturnValue({
    fullMatches: 1,
    partialMatches: 1,
    totalProjects: 10,
  } as ProjectMatches),
};

describe('MatchesOverviewComponent', () => {
  let component: MatchesOverviewComponent;
  let fixture: ComponentFixture<MatchesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchesOverviewComponent],
      providers: [
        { provide: 'SearchTagService', useValue: mockSearchTagService },
        {
          provide: TechProjectMatchingService,
          useValue: mockTechProjectMatchingService,
        },
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
    fixture.detectChanges();

    expect(component.tagMatches.length).toBe(2);
    expect(
      mockTechProjectMatchingService.getProjectMatchesForTag
    ).toHaveBeenCalledWith('Angular');
    expect(
      mockTechProjectMatchingService.getProjectMatchesForTag
    ).toHaveBeenCalledWith('TypeScript');
  });

  it('should not display anything when no tags are present', () => {
    mockSearchTagService.tags$.next([]);
    fixture.detectChanges();

    expect(component.tagMatches.length).toBe(0);
  });

  it('should format match text correctly', () => {
    const matches: ProjectMatches = {
      fullMatches: 2,
      partialMatches: 3,
      totalProjects: 10,
    };
    const result = component.getMatchText(matches);
    expect(result).toBe('2 matching projects, 3 partially matching projects');
  });

  it('should handle singular forms correctly', () => {
    const matches: ProjectMatches = {
      fullMatches: 1,
      partialMatches: 1,
      totalProjects: 10,
    };
    const result = component.getMatchText(matches);
    expect(result).toBe('1 matching project, 1 partially matching project');
  });

  it('should handle no matches correctly', () => {
    const matches: ProjectMatches = {
      fullMatches: 0,
      partialMatches: 0,
      totalProjects: 10,
    };
    const result = component.getMatchText(matches);
    expect(result).toBe('no matching project');
  });
});
