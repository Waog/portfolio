import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchEngineService } from '@portfolio/search-engine-angular';
import { SearchTagService } from '@portfolio/search-tags';
import { BehaviorSubject, of } from 'rxjs';

import { ProjectListComponent } from './project-list.component';
import { ProjectListCustomOrderService } from './project-list-custom-order.service';

jest.mock('@portfolio/search-engine-angular', () => ({
  SearchEngineService: class {
    searchResult$ = new BehaviorSubject({
      loading: false,
      ui: {
        matchesOverview: [],
        projects: [],
        skills: [],
      },
      ngService: {
        loading: false,
        progressPercent: 100,
      },
    });
  },
}));

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  const mockSearchEngineService = {
    searchResult$: of({
      loading: false,
      ui: {
        matchesOverview: [],
        projects: [],
        skills: [],
      },
      ngService: {
        loading: false,
        progressPercent: 100,
      },
    }),
  };

  const mockSearchTagService = {
    tags$: of([]),
  };

  const mockProjectListCustomOrderService = {
    projectsInOrder$: of([]),
    moveProjectUp: jest.fn(),
    moveProjectDown: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListComponent],
      providers: [
        { provide: SearchEngineService, useValue: mockSearchEngineService },
        { provide: SearchTagService, useValue: mockSearchTagService },
        {
          provide: ProjectListCustomOrderService,
          useValue: mockProjectListCustomOrderService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
