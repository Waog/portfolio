import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Project } from '@portfolio/search-engine-domain';

import { ProjectItemMetaTilesComponent } from './project-item-meta-tiles.component';

describe('ProjectItemMetaTilesComponent', () => {
  let component: ProjectItemMetaTilesComponent;
  let fixture: ComponentFixture<ProjectItemMetaTilesComponent>;

  const mockProject: Partial<Project> = {
    role: 'Developer',
    team: 'Development Team',
    fromText: '01/2024',
    toText: '06/2025',
    durationText: '1+ year',
    location: 'Remote',
    workMode: 'Remote',
    company: 'Test Company',
    industry: 'Technology',
  } as Partial<Project>;

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
    expect(compiled.textContent).toContain('01/2024 - 06/2025');
    expect(compiled.textContent).toContain('1+ year');
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
