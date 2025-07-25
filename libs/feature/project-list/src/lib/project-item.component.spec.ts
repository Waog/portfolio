import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Project } from '@portfolio/projects';

import { ProjectItemComponent } from './project-item.component';

describe('ProjectItemComponent', () => {
  let component: ProjectItemComponent;
  let fixture: ComponentFixture<ProjectItemComponent>;

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

  it('should display project information', () => {
    expect(component.project()).toEqual(mockProject);
  });

  it('should toggle content visibility', () => {
    expect(component.showExpandedContent).toBe(false);

    component.toggleContent();
    expect(component.showExpandedContent).toBe(true);

    component.toggleContent();
    expect(component.showExpandedContent).toBe(false);
  });
});
