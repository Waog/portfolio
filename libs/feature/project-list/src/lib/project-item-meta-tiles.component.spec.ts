import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Project } from '@portfolio/projects';

import { ProjectItemMetaTilesComponent } from './project-item-meta-tiles.component';

describe('ProjectItemMetaTilesComponent', () => {
  let component: ProjectItemMetaTilesComponent;
  let fixture: ComponentFixture<ProjectItemMetaTilesComponent>;

  const mockProject: Project = new Project({
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
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectItemMetaTilesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectItemMetaTilesComponent);
    component = fixture.componentInstance;

    // Set the required input before detectChanges
    fixture.componentRef.setInput('project', mockProject);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display project meta information', () => {
    expect(component.project()).toEqual(mockProject);
  });

  it('should display role and team information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Developer');
    expect(compiled.textContent).toContain('Development Team');
  });

  it('should display duration and time information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('2024-01-01 to 2024-12-31');
    expect(compiled.textContent).toContain('12 months');
  });

  it('should display work mode and location information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Remote');
  });

  it('should display company and industry information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Company');
    expect(compiled.textContent).toContain('Technology');
  });
});
