import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectService } from '@portfolio/projects';
import { SearchTagService } from '@portfolio/search-tags';
import { BehaviorSubject } from 'rxjs';

import { MatchesOverviewComponent } from './matches-overview.component';

// Mock SearchTagService
const mockSearchTagService = {
  tags$: new BehaviorSubject<string[]>([]),
};

// Mock ProjectService
const mockProjectService = {
  getBy: jest.fn().mockReturnValue([]),
};

describe('MatchesOverviewComponent', () => {
  let component: MatchesOverviewComponent;
  let fixture: ComponentFixture<MatchesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchesOverviewComponent],
      providers: [
        { provide: SearchTagService, useValue: mockSearchTagService },
        { provide: ProjectService, useValue: mockProjectService },
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
    // Mock the getBy method to return different arrays for full and partial matches
    mockProjectService.getBy
      .mockReturnValueOnce([{}, {}]) // 2 full matches for 'Angular'
      .mockReturnValueOnce([{}]) // 1 partial match for 'Angular'
      .mockReturnValueOnce([{}, {}, {}]) // 3 full matches for 'TypeScript'
      .mockReturnValueOnce([{}, {}]); // 2 partial matches for 'TypeScript'

    mockSearchTagService.tags$.next(['Angular', 'TypeScript']);
    fixture.detectChanges();

    expect(component.tagMatches.length).toBe(2);
    expect(mockProjectService.getBy).toHaveBeenCalledWith({
      isFullMatchFor: 'Angular',
    });
    expect(mockProjectService.getBy).toHaveBeenCalledWith({
      isPartialFor: 'Angular',
    });
    expect(mockProjectService.getBy).toHaveBeenCalledWith({
      isFullMatchFor: 'TypeScript',
    });
    expect(mockProjectService.getBy).toHaveBeenCalledWith({
      isPartialFor: 'TypeScript',
    });

    expect(component.tagMatches[0]).toEqual({
      tag: 'Angular',
      fullMatches: 2,
      partialMatches: 1,
    });
    expect(component.tagMatches[1]).toEqual({
      tag: 'TypeScript',
      fullMatches: 3,
      partialMatches: 2,
    });
  });

  it('should not display anything when no tags are present', () => {
    mockSearchTagService.tags$.next([]);
    fixture.detectChanges();

    expect(component.tagMatches.length).toBe(0);
  });
});
