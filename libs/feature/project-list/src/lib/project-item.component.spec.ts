import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Project, TechnologyMatchingService } from '@portfolio/projects';
import { SearchTagService } from '@portfolio/search-tags';
import { BehaviorSubject } from 'rxjs';

import { ProjectItemComponent } from './project-item.component';

describe('ProjectItemComponent', () => {
  let component: ProjectItemComponent;
  let fixture: ComponentFixture<ProjectItemComponent>;
  let mockTechnologyMatchingService: jest.Mocked<TechnologyMatchingService>;

  // Mock SearchTagService
  const mockSearchTagService = {
    tags$: new BehaviorSubject<string[]>([]),
    currentTags: [],
  };

  const mockProject: Project = {
    id: 'test-project',
    title: 'Test Project',
    projectType: 'Web Application',
    compactDescription: 'A test project for unit testing',
    keyAchievements: 'Successfully implemented testing',
    fullDescription: 'This is a full description of the test project',
    features: ['Feature 1', 'Feature 2'],
    highlights: ['Highlight 1', 'Highlight 2'],
    technologies: ['Angular', 'TypeScript'],
    role: 'Developer',
    team: 'Development Team',
    fromTo: '2024-01-01 to 2024-12-31',
    duration: '12 months',
    location: 'Remote',
    workMode: 'Remote',
    company: 'Test Company',
    industry: 'Technology',
  };

  beforeEach(async () => {
    const mockTechnologyMatchingServiceObj = {
      getBestMatchType: jest.fn(),
      getMatchType: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ProjectItemComponent],
      providers: [
        { provide: SearchTagService, useValue: mockSearchTagService },
        {
          provide: TechnologyMatchingService,
          useValue: mockTechnologyMatchingServiceObj,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectItemComponent);
    component = fixture.componentInstance;
    mockTechnologyMatchingService = TestBed.inject(
      TechnologyMatchingService
    ) as jest.Mocked<TechnologyMatchingService>;

    // Set the required input before detectChanges
    fixture.componentRef.setInput('project', mockProject);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('technologies getter', () => {
    it('should return technologies with match types', () => {
      // Mock the getBestMatchType method
      mockTechnologyMatchingService.getBestMatchType.mockImplementation(
        (tech: string) => {
          switch (tech) {
            case 'Angular':
              return 'full';
            case 'TypeScript':
              return 'indirect';
            default:
              return 'none';
          }
        }
      );

      const technologies = component.technologies;
      expect(technologies).toEqual([
        { name: 'Angular', matchType: 'full' },
        { name: 'TypeScript', matchType: 'indirect' },
      ]);
      expect(
        mockTechnologyMatchingService.getBestMatchType
      ).toHaveBeenCalledWith('Angular');
      expect(
        mockTechnologyMatchingService.getBestMatchType
      ).toHaveBeenCalledWith('TypeScript');
    });
  });

  describe('technology categorization', () => {
    beforeEach(() => {
      // Mock the getBestMatchType method for each technology
      mockTechnologyMatchingService.getBestMatchType.mockImplementation(
        (tech: string) => {
          switch (tech) {
            case 'Angular':
              return 'full';
            case 'TypeScript':
              return 'indirect';
            default:
              return 'none';
          }
        }
      );
    });

    describe('greenTechnologies', () => {
      it('should return technologies with full match', () => {
        const greenTechs = component.greenTechnologies;
        expect(greenTechs).toEqual(['Angular']);
      });
    });

    describe('yellowTechnologies', () => {
      it('should return technologies with indirect match', () => {
        const yellowTechs = component.yellowTechnologies;
        expect(yellowTechs).toEqual(['TypeScript']);
      });
    });

    describe('grayTechnologies', () => {
      it('should return technologies with no match', () => {
        const grayTechs = component.grayTechnologies;
        expect(grayTechs).toEqual([]);
      });
    });
  });
});
