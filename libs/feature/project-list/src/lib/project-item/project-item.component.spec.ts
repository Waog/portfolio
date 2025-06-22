import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Project } from '@portfolio/projects';

import { ProjectItemComponent } from './project-item.component';

describe('ProjectItemComponent', () => {
  let component: ProjectItemComponent;
  let fixture: ComponentFixture<ProjectItemComponent>;

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
    await TestBed.configureTestingModule({
      imports: [ProjectItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectItemComponent);
    component = fixture.componentInstance;

    // Set the required input before detectChanges
    fixture.componentRef.setInput('project', mockProject);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('technology categorization', () => {
    beforeEach(() => {
      // Mock the technology matching service
      const mockTechnologies = [
        { name: 'React', matchType: 'full' as const },
        { name: 'Angular', matchType: 'full' as const },
        { name: 'TypeScript', matchType: 'indirect' as const },
        { name: 'CSS', matchType: 'none' as const },
        { name: 'HTML', matchType: 'none' as const },
      ];

      jest
        .spyOn(component['technologyMatchingService'], 'addMatchTypes')
        .mockReturnValue(mockTechnologies);
    });

    describe('greenTechnologies', () => {
      it('should return technologies with full match', () => {
        const greenTechs = component.greenTechnologies;
        expect(greenTechs).toEqual(['React', 'Angular']);
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
        expect(grayTechs).toEqual(['CSS', 'HTML']);
      });
    });
  });
});
