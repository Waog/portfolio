import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SearchEngineService } from '@portfolio/search-engine-angular';
import { Project } from '@portfolio/search-engine-domain';
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  scan,
  shareReplay,
  Subject,
  tap,
  withLatestFrom,
} from 'rxjs';

// TODO: reset order when search terms change

interface CustomOrderDiff {
  projectId: string;
  customIndex: number;
}

type UserAction = { type: 'up'; id: string } | { type: 'down'; id: string };

type Action =
  | { type: 'setOrderFromUrl'; orderIds: string[] | null }
  | { type: 'up'; id: string; baseIds: string[] }
  | { type: 'down'; id: string; baseIds: string[] };

type State = {
  orderIds: string[] | null;
};

const initialState: State = { orderIds: null };

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
  private readonly searchEngineService = inject(SearchEngineService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly actions$ = new Subject<UserAction>();

  private readonly originalProjects$: Observable<Project[]> =
    this.searchEngineService.searchResult$.pipe(
      map(searchResult => searchResult.ui?.projects ?? []),
      distinctUntilChanged((a, b) => areProjectArraysEqualById(a, b)),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  private readonly state$: Observable<State> = this.createStateStream();

  readonly projectsInOrder$: Observable<Project[]> = combineLatest([
    this.originalProjects$,
    this.state$,
  ]).pipe(
    map(([projects, state]) => applyOrderIds(projects, state.orderIds)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor() {
    this.setupUrlSyncEffect();
  }

  /**
   * Moves a project up in the custom order.
   */
  moveProjectUp(projectId: string): void {
    this.actions$.next({ type: 'up', id: projectId });
  }

  /**
   * Moves a project down in the custom order.
   */
  moveProjectDown(projectId: string): void {
    this.actions$.next({ type: 'down', id: projectId });
  }

  private createStateStream(): Observable<State> {
    const urlAction$ = combineLatest([
      this.route.queryParamMap,
      this.originalProjects$,
    ]).pipe(
      map(([queryParamMap, projects]) => {
        const baseIds = projects.map(project => project.id);
        return decodeOrderFromQuery(queryParamMap, baseIds);
      }),
      distinctUntilChanged((a, b) => arraysNullableEqual(a, b)),
      map(orderIds => ({ type: 'setOrderFromUrl', orderIds } as Action))
    );

    const userAction$ = this.actions$.pipe(
      withLatestFrom(this.originalProjects$),
      map(([action, projects]) => ({
        ...action,
        baseIds: projects.map(project => project.id),
      }))
    );

    return merge(urlAction$, userAction$).pipe(
      scan(
        (state: State, action: Action) => reduceState(state, action),
        initialState
      ),
      distinctUntilChanged((a, b) => stateEquals(a, b)),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  private setupUrlSyncEffect(): void {
    combineLatest([
      this.originalProjects$,
      this.state$,
      this.route.queryParamMap,
    ])
      .pipe(
        map(([projects, state, queryParamMap]) => {
          const baseIds = projects.map(project => project.id);
          const nextOrderParam = encodeOrderParam(baseIds, state.orderIds);
          const currentOrderParam = queryParamMap.get('order');

          return { baseIds, nextOrderParam, currentOrderParam };
        }),
        filter(
          ({ baseIds, nextOrderParam, currentOrderParam }) =>
            !(
              baseIds.length === 0 &&
              nextOrderParam === null &&
              currentOrderParam !== null
            )
        ),
        map(({ nextOrderParam }) => nextOrderParam),
        distinctUntilChanged(),
        tap(orderParam => this.navigateWithOrderParam(orderParam)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private navigateWithOrderParam(orderParam: string | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { order: orderParam },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}

function reduceState(state: State, action: Action): State {
  if (action.type === 'setOrderFromUrl') {
    return { orderIds: action.orderIds };
  }

  const currentIds = normalizeOrderIds(action.baseIds, state.orderIds);
  const nextIds =
    action.type === 'up'
      ? moveId(currentIds, action.id, -1)
      : moveId(currentIds, action.id, 1);

  return {
    orderIds: arraysEqual(nextIds, action.baseIds) ? null : nextIds,
  };
}

function decodeOrderFromQuery(
  queryParamMap: ParamMap,
  baseIds: string[]
): string[] | null {
  const orderParam = queryParamMap.get('order');
  if (!orderParam || orderParam.trim() === '') {
    return null;
  }

  try {
    const customDiffs = parseOrderParam(orderParam);
    if (customDiffs.length === 0) {
      return null;
    }

    const orderIds = applyCustomDiffsToIds(baseIds, customDiffs);
    return arraysEqual(orderIds, baseIds) ? null : orderIds;
  } catch (error) {
    console.warn(
      `Failed to load custom order from URL. Order param: "${orderParam}". Error: ${
        error instanceof Error ? error.message : error
      }`
    );
    return null;
  }
}

function encodeOrderParam(
  baseIds: string[],
  orderIds: string[] | null
): string | null {
  if (!orderIds) {
    return null;
  }

  const normalizedOrderIds = normalizeOrderIds(baseIds, orderIds);
  const customDiffs = calculateCustomDiffs(normalizedOrderIds, baseIds);
  if (customDiffs.length === 0) {
    return null;
  }

  return customDiffs
    .map(diff => `${diff.projectId}:${diff.customIndex}`)
    .join(',');
}

function parseOrderParam(orderParam: string): CustomOrderDiff[] {
  return orderParam
    .split(',')
    .filter(part => part.trim() !== '')
    .map(part => {
      const [projectId = '', indexString = ''] = part.split(':');
      return {
        projectId: projectId.trim(),
        customIndex: parseInt(indexString.trim(), 10),
      };
    })
    .filter(
      diff => diff.projectId !== '' && Number.isInteger(diff.customIndex)
    );
}

function calculateCustomDiffs(
  customOrder: string[],
  defaultOrder: string[]
): CustomOrderDiff[] {
  const diffs: CustomOrderDiff[] = [];
  for (let i = 0; i < customOrder.length; i++) {
    if (customOrder[i] !== defaultOrder[i]) {
      diffs.push({ projectId: customOrder[i], customIndex: i });
    }
  }

  return diffs;
}

function applyCustomDiffsToIds(
  baseIds: string[],
  customDiffs: CustomOrderDiff[]
): string[] {
  if (customDiffs.length === 0) {
    return [...baseIds];
  }

  const existingIds = new Set(baseIds);
  const validDiffs = customDiffs.filter(diff =>
    existingIds.has(diff.projectId)
  );
  const idsToMove = new Set(validDiffs.map(diff => diff.projectId));
  const remaining = baseIds.filter(id => !idsToMove.has(id));

  for (const { projectId, customIndex } of validDiffs) {
    const insertionIndex = clamp(customIndex, 0, remaining.length);
    remaining.splice(insertionIndex, 0, projectId);
  }

  return remaining;
}

function applyOrderIds(
  projects: Project[],
  orderIds: string[] | null
): Project[] {
  if (!orderIds) {
    return projects;
  }

  const projectById = new Map(projects.map(project => [project.id, project]));
  const knownIds = orderIds.filter(id => projectById.has(id));
  const orderedKnownIds = unique(knownIds);
  const remainingIds = projects
    .map(project => project.id)
    .filter(id => !orderedKnownIds.includes(id));

  return [...orderedKnownIds, ...remainingIds]
    .map(id => projectById.get(id))
    .filter((project): project is Project => project !== undefined);
}

function moveId(ids: string[], id: string, delta: -1 | 1): string[] {
  const fromIndex = ids.indexOf(id);
  if (fromIndex === -1) {
    return ids;
  }

  const toIndex = fromIndex + delta;
  if (toIndex < 0 || toIndex >= ids.length) {
    return ids;
  }

  const nextIds = [...ids];
  [nextIds[fromIndex], nextIds[toIndex]] = [
    nextIds[toIndex],
    nextIds[fromIndex],
  ];
  return nextIds;
}

function normalizeOrderIds(
  baseIds: string[],
  orderIds: string[] | null
): string[] {
  if (!orderIds) {
    return [...baseIds];
  }

  const baseIdSet = new Set(baseIds);
  const knownOrderedIds = unique(orderIds.filter(id => baseIdSet.has(id)));
  const remainingIds = baseIds.filter(id => !knownOrderedIds.includes(id));
  return [...knownOrderedIds, ...remainingIds];
}

function unique(ids: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const id of ids) {
    if (!seen.has(id)) {
      seen.add(id);
      result.push(id);
    }
  }
  return result;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function stateEquals(a: State, b: State): boolean {
  return arraysNullableEqual(a.orderIds, b.orderIds);
}

function arraysNullableEqual(
  a: readonly string[] | null,
  b: readonly string[] | null
): boolean {
  if (a === b) {
    return true;
  }

  if (a === null || b === null) {
    return false;
  }

  return arraysEqual(a, b);
}

function areProjectArraysEqualById(
  a: readonly Project[],
  b: readonly Project[]
): boolean {
  if (a === b) {
    return true;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i].id !== b[i].id) {
      return false;
    }
  }

  return true;
}

function arraysEqual(a: readonly string[], b: readonly string[]): boolean {
  if (a === b) {
    return true;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}
