import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { CustomizationStateService } from '@portfolio/customization-state';
import { Project } from '@portfolio/search-engine-domain';

import { CustomizableProjectItemComponent } from './customizable-project-item.component';
import { ProjectItemComponent } from './project-item.component';

describe('CustomizableProjectItemComponent', () => {
  let component: CustomizableProjectItemComponent;
  let fixture: ComponentFixture<CustomizableProjectItemComponent>;

  const mockProject: Project = {
    id: 'test-project',
    title: 'Test Project',
    projectType: 'Web Application',
    compactDescription: 'A test project for unit testing',
    keyAchievements: 'Successfully implemented testing',
    fullDescription: 'This is a full description of the test project',
    features: ['Feature 1', 'Feature 2'],
    highlights: ['Highlight 1', 'Highlight 2'],
    technologies: {
      fullMatches: ['Angular', 'TypeScript'],
      partialMatches: [],
      nonMatches: [],
    },
    role: 'Developer',
    team: 'Development Team',
    from: new Date(Date.UTC(2024, 0)),
    fromText: '01/2024',
    to: new Date(Date.UTC(2024, 11)),
    toText: '12/2024',
    duration: { years: 1 },
    durationText: '1 year',
    location: 'Remote',
    workMode: 'Remote',
    company: 'Test Company',
    industry: 'Technology',
    teamSize: 3,
    engagementType: 'Client',
    commercialContext: 'Paid',
    usageScope: 'Public',
    maturity: 'Production',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizableProjectItemComponent],
      providers: [
        provideRouter([]),
        {
          provide: CustomizationStateService,
          useValue: {
            isPanelShown: signal(true),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomizableProjectItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('project', mockProject);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass default values 1:1 to wrapped project item', () => {
    const wrapped = fixture.debugElement.query(
      By.directive(ProjectItemComponent)
    ).componentInstance as ProjectItemComponent;

    expect(wrapped.project()).toEqual(mockProject);
    expect(wrapped.isTopProject()).toBe(false);
    expect(wrapped.compact()).toBe(false);
    expect(wrapped.printMode()).toBe(false);
  });

  it('should pass all custom values 1:1 to wrapped project item', () => {
    fixture.componentRef.setInput('isTopProject', true);
    fixture.componentRef.setInput('compact', true);
    fixture.componentRef.setInput('printMode', true);
    fixture.detectChanges();

    const wrapped = fixture.debugElement.query(
      By.directive(ProjectItemComponent)
    ).componentInstance as ProjectItemComponent;

    expect(wrapped.isTopProject()).toBe(true);
    expect(wrapped.compact()).toBe(true);
    expect(wrapped.printMode()).toBe(true);
  });

  it('should override initial isTopProject and compact values through panel actions', () => {
    fixture.componentRef.setInput('isTopProject', false);
    fixture.componentRef.setInput('compact', false);
    fixture.detectChanges();

    clickTopProjectButton(true);
    fixture.detectChanges();

    clickCompactButton(true);
    fixture.detectChanges();

    const wrapped = fixture.debugElement.query(
      By.directive(ProjectItemComponent)
    ).componentInstance as ProjectItemComponent;

    expect(wrapped.isTopProject()).toBe(true);
    expect(wrapped.compact()).toBe(true);
  });

  function getTopProjectButton(value: boolean) {
    return fixture.debugElement.query(
      By.css(`mat-button-toggle[data-top-project="${value}"]`)
    );
  }

  function clickTopProjectButton(value: boolean) {
    const toggleButtonElement = getTopProjectButton(
      value
    ).nativeElement.querySelector('button') as HTMLButtonElement;
    toggleButtonElement.click();
  }

  function getCompactButton(value: boolean) {
    return fixture.debugElement.query(
      By.css(`mat-button-toggle[data-compact="${value}"]`)
    );
  }

  function clickCompactButton(value: boolean) {
    const toggleButtonElement = getCompactButton(
      value
    ).nativeElement.querySelector('button') as HTMLButtonElement;
    toggleButtonElement.click();
  }
});
