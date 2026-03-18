import { Location } from '@angular/common';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchEngineService } from '@portfolio/search-engine-angular';
import { Project } from '@portfolio/search-engine-domain';
import { SearchTagService } from '@portfolio/search-tags';
import { arrayMoveMutable } from 'array-move';
import _ from 'lodash';
import {
  distinctUntilChanged,
  map,
  Observable,
  ReplaySubject,
  scan,
  shareReplay,
  skip,
  tap,
} from 'rxjs';

interface CustomOrderDiff {
  projectId: string;
  customIndex: number;
}

type Action =
  | { type: 'setOriginalProjects'; projects: Project[] }
  | { type: 'setCustomOrder'; customOrderDiff: CustomOrderDiff[] }
  | { type: 'resetCustomOrder' }
  | { type: 'up'; projectId: string }
  | { type: 'down'; projectId: string };

type State = {
  originalProjects: Project[];
  customOrderDiff: CustomOrderDiff[];
};

const initialState: State = {
  originalProjects: [],
  customOrderDiff: [],
};

/**
 * Service responsible for managing custom project ordering.
 * Provides a self-contained interface for ordered projects.
 * Handles URL serialization/deserialization and order manipulation internally.
 */
@Injectable({
  providedIn: 'root',
})
export class ProjectListCustomOrderService {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);
  private readonly searchEngineService = inject(SearchEngineService);
  private readonly searchTagService = inject(SearchTagService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly actions$ = new ReplaySubject<Action>(1);

  private readonly state$: Observable<State> = this.actions$.pipe(
    scan(
      (state: State, action: Action) => this.reduceState(state, action),
      initialState
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly projectsInOrder$: Observable<Project[]> = this.state$.pipe(
    map(state => this.toCustomOrderedProjects(state)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor() {
    this.setupSearchResultsUpdateState();
    this.setupUrlSetsCustomOrderOnLoad();
    this.setupStateChangeChangesUrl();
    this.setupResetOnSearchTagChangeEffect();
  }

  private setupSearchResultsUpdateState() {
    this.searchEngineService.searchResult$
      .pipe(
        map(searchResult => searchResult.ui?.projects || []),
        distinctUntilChanged((projectsA, projectsB) =>
          _.isEqual(projectsA, projectsB)
        ),
        map(projects => ({ type: 'setOriginalProjects', projects } as Action)),
        tap(action => this.actions$.next(action)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private setupUrlSetsCustomOrderOnLoad(): void {
    this.route.queryParamMap
      .pipe(
        map(queryParamMap => {
          return queryParamMap.get('order');
        }),
        distinctUntilChanged(),
        map(orderUrlParam => this.toCustomOrderDiff(orderUrlParam)),
        map(
          customOrderDiff =>
            ({ type: 'setCustomOrder', customOrderDiff } as Action)
        ),
        tap(action => this.actions$.next(action)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private setupStateChangeChangesUrl(): void {
    this.state$
      .pipe(
        map(({ customOrderDiff }) => customOrderDiff),
        distinctUntilChanged(),
        map(customOrderDiff => this.toUrlParam(customOrderDiff)),
        distinctUntilChanged(),
        tap(urlParam => this.setOrderUrlParam(urlParam)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private setupResetOnSearchTagChangeEffect(): void {
    this.searchTagService.tags$
      .pipe(
        skip(1), // Skip the initial value to avoid resetting on service initialization
        tap(() => this.actions$.next({ type: 'resetCustomOrder' })),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  /**
   * Moves a project up in the custom order.
   */
  moveProjectUp(projectId: string): void {
    this.actions$.next({ type: 'up', projectId });
  }

  /**
   * Moves a project down in the custom order.
   */
  moveProjectDown(projectId: string): void {
    this.actions$.next({ type: 'down', projectId });
  }

  private toCustomOrderDiff(orderParam: string | null): CustomOrderDiff[] {
    if (!orderParam) {
      return [];
    }
    return orderParam
      .trim()
      .split(',')
      .map(part => ({
        projectId: part.split(':')[0],
        customIndex: parseInt(part.split(':')[1], 10),
      }));
  }

  private toUrlParam(customOrderDiff: CustomOrderDiff[]): string | null {
    if (customOrderDiff.length === 0) {
      return null;
    }
    return customOrderDiff
      .map(diff => `${diff.projectId}:${diff.customIndex}`)
      .join(',');
  }

  private setOrderUrlParam(orderParam: string | null): void {
    const urlTree = this.router.createUrlTree([], {
      queryParams: { order: orderParam },
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });
    this.location.replaceState(this.router.serializeUrl(urlTree));
  }

  private toDiff(
    originalProjects: Project[],
    customOrderedProjects: Project[]
  ): CustomOrderDiff[] {
    if (originalProjects.length !== customOrderedProjects.length) {
      throw new Error(
        'Original and custom ordered project lists must have the same length'
      );
    }
    const result: CustomOrderDiff[] = [];
    for (let i = 0; i < originalProjects.length; i++) {
      if (originalProjects[i].id !== customOrderedProjects[i].id) {
        result.push({ projectId: customOrderedProjects[i].id, customIndex: i });
      }
    }
    return result;
  }

  private reduceState(state: State, action: Action): State {
    if (action.type === 'setOriginalProjects') {
      return { ...state, originalProjects: action.projects };
    }

    if (action.type === 'setCustomOrder') {
      return { ...state, customOrderDiff: action.customOrderDiff };
    }

    if (action.type === 'resetCustomOrder') {
      return { ...state, customOrderDiff: [] };
    }

    if (action.type === 'up') {
      const customOrderedProjects = this.toCustomOrderedProjects(state);
      const fromIndex = customOrderedProjects.findIndex(
        project => project.id === action.projectId
      );
      const toIndex = Math.max(0, fromIndex - 1);
      arrayMoveMutable(customOrderedProjects, fromIndex, toIndex);
      return {
        ...state,
        customOrderDiff: this.toDiff(
          state.originalProjects,
          customOrderedProjects
        ),
      };
    }

    if (action.type === 'down') {
      const customOrderedProjects = this.toCustomOrderedProjects(state);
      const fromIndex = customOrderedProjects.findIndex(
        project => project.id === action.projectId
      );
      const toIndex = Math.min(customOrderedProjects.length - 1, fromIndex + 1);
      arrayMoveMutable(customOrderedProjects, fromIndex, toIndex);
      return {
        ...state,
        customOrderDiff: this.toDiff(
          state.originalProjects,
          customOrderedProjects
        ),
      };
    }

    throw new Error(`Unknown action type: ${JSON.stringify(action)}`);
  }

  private toCustomOrderedProjects(state: State): Project[] {
    const { customOrderDiff, originalProjects } = state;
    if (!customOrderDiff) {
      return originalProjects;
    }

    const result = [...originalProjects];

    for (const { projectId, customIndex } of customOrderDiff) {
      const fromIndex = result.findIndex(project => project.id === projectId);
      const toIndex = customIndex;
      arrayMoveMutable(result, fromIndex, toIndex);
    }

    return result;
  }
}
