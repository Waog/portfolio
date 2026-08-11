import { signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { CustomizableColorChipListUrlService } from '@portfolio/customizable-color-chip-list';
import { CustomizationStateService } from '@portfolio/customization-state';
import { Project } from '@portfolio/search-engine-domain';
import { UrlStateService } from '@portfolio/url-state';

import { CustomizableProjectItemComponent } from './customizable-project-item.component';
import { CustomizableProjectItemUrlService } from './customizable-project-item-url.service';
import { ProjectItemComponent } from './project-item.component';

describe('CustomizableProjectItemComponent', () => {
  let component: CustomizableProjectItemComponent;
  let fixture: ComponentFixture<CustomizableProjectItemComponent>;
  let customIsTopProjectByProjectId: WritableSignal<
    Record<string, boolean | null>
  >;
  let customCompactByProjectId: WritableSignal<Record<string, boolean | null>>;
  let mockCustomizableProjectItemUrlService: {
    getIsTopProject: jest.Mock;
    getCompact: jest.Mock;
    setIsTopProject: jest.Mock;
    setCompact: jest.Mock;
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
    customIsTopProjectByProjectId = signal<Record<string, boolean | null>>({});
    customCompactByProjectId = signal<Record<string, boolean | null>>({});
    mockCustomizableProjectItemUrlService = {
      getIsTopProject: jest.fn(
        (projectId: string) =>
          customIsTopProjectByProjectId()[projectId] ?? null
      ),
      getCompact: jest.fn(
        (projectId: string) => customCompactByProjectId()[projectId] ?? null
      ),
      setIsTopProject: jest.fn((projectId: string, value: boolean | null) => {
        customIsTopProjectByProjectId.update(state => ({
          ...state,
          [projectId]: value,
        }));
      }),
      setCompact: jest.fn((projectId: string, value: boolean | null) => {
        customCompactByProjectId.update(state => ({
          ...state,
          [projectId]: value,
        }));
      }),
    };

    await TestBed.configureTestingModule({
      imports: [CustomizableProjectItemComponent],
      providers: [
        provideRouter([]),
        {
          provide: UrlStateService,
          useValue: {
            updateValue: () => undefined,
          },
        },
        {
          provide: CustomizationStateService,
          useValue: {
            isPanelShown: signal(true),
          },
        },
        {
          provide: CustomizableColorChipListUrlService,
          useValue: {
            getSpacing: () => null,
            getRows: () => null,
            setSpacing: () => undefined,
            setRows: () => undefined,
          },
        },
        {
          provide: CustomizableProjectItemUrlService,
          useValue: mockCustomizableProjectItemUrlService,
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

  it('should forward panel actions to CustomizableProjectItemUrlService keyed by project id', () => {
    clickTopProjectButton(true);
    clickCompactButton(true);

    expect(
      mockCustomizableProjectItemUrlService.setIsTopProject
    ).toHaveBeenCalledWith(mockProject.id, true);
    expect(
      mockCustomizableProjectItemUrlService.setCompact
    ).toHaveBeenCalledWith(mockProject.id, true);
  });

  it('should pass null to URL service when selected value equals input default', () => {
    fixture.componentRef.setInput('isTopProject', false);
    fixture.componentRef.setInput('compact', false);
    fixture.detectChanges();

    clickTopProjectButton(true);
    clickCompactButton(true);
    mockCustomizableProjectItemUrlService.setIsTopProject.mockClear();
    mockCustomizableProjectItemUrlService.setCompact.mockClear();

    clickTopProjectButton(false);
    clickCompactButton(false);

    expect(
      mockCustomizableProjectItemUrlService.setIsTopProject
    ).toHaveBeenCalledWith(mockProject.id, null);
    expect(
      mockCustomizableProjectItemUrlService.setCompact
    ).toHaveBeenCalledWith(mockProject.id, null);
  });

  it('should reflect a customization already present in CustomizableProjectItemUrlService on load', () => {
    customIsTopProjectByProjectId.set({ [mockProject.id]: true });
    customCompactByProjectId.set({ [mockProject.id]: true });
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
