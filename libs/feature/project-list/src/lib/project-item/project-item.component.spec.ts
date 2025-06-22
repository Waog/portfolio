import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Project } from '../models/project';
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

  describe('getChipColor', () => {
    it('should return green for full match', () => {
      expect(component.getChipColor('full')).toBe('green');
    });

    it('should return yellow for indirect match', () => {
      expect(component.getChipColor('indirect')).toBe('yellow');
    });

    it('should return gray for no match', () => {
      expect(component.getChipColor('none')).toBe('gray');
    });

    it('should return gray for unknown match type', () => {
      expect(component.getChipColor('unknown')).toBe('gray');
    });
  });

  describe('getChipIcon', () => {
    it('should return star for full match', () => {
      expect(component.getChipIcon('full')).toBe('star');
    });

    it('should return star_border for indirect match', () => {
      expect(component.getChipIcon('indirect')).toBe('star_border');
    });

    it('should return undefined for no match', () => {
      expect(component.getChipIcon('none')).toBeUndefined();
    });

    it('should return undefined for unknown match type', () => {
      expect(component.getChipIcon('unknown')).toBeUndefined();
    });
  });
});
