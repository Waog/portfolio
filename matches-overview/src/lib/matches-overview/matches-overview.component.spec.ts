import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchTagService } from '@portfolio/tag-input';
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
        { provide: SearchTagService, useValue: mockSearchTagService },
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
});
