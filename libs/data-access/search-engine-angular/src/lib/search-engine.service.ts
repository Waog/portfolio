import { Injectable, OnDestroy } from '@angular/core';
import { SearchEngineDomainResult } from '@portfolio/search-engine-domain';
import {
  createSearchEngineWorker,
  SEARCH_ENGINE_WORKER_PROGRESS_KIND,
  SEARCH_ENGINE_WORKER_REQUEST_KIND,
  SearchEngineWorkerOutput,
  SearchEngineWorkerProgress,
  SearchEngineWorkerResult,
} from '@portfolio/search-engine-worker';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';

export type SearchResult = {
  loading: boolean;
  ui?: {
    matchesOverview: SearchEngineDomainResult['matchesOverview'];
    projects: SearchEngineDomainResult['projects'];
    skills: SearchEngineDomainResult['skills'];
  };
  ngService?: {
    loading: boolean;
    progressPercent: number;
    workerMessageLatencyMs?: number;
  };
  worker?: SearchEngineWorkerResult;
  domain?: SearchEngineDomainResult;
};

@Injectable({
  providedIn: 'root',
})
export class SearchEngineService implements OnDestroy {
  private worker?: Worker;
  private queryIdCounter = 0;
  // undefined = loading
  private readonly resultSubject = new BehaviorSubject<{
    queryId?: number;
    workerResult?: SearchEngineWorkerResult;
    serviceData: {
      loading: boolean;
      progressPercent: number;
      workerMessageLatencyMs?: number;
    };
  }>({ serviceData: { loading: true, progressPercent: 0 } });

  readonly searchResult$: Observable<SearchResult> = this.resultSubject.pipe(
    tap(result => {
      console.log('SearchEngineService resultSubject emitted:', result, {
        queryIdCounter: this.queryIdCounter,
      });
    }),
    filter(
      result =>
        (result.serviceData.loading &&
          result.queryId === this.queryIdCounter) ||
        result.workerResult?.queryId === this.queryIdCounter
    ),
    map(result => ({
      loading: result.serviceData.loading,
      ngService: result.serviceData,
      ...(!result.serviceData.loading && result.workerResult
        ? {
            ui: {
              matchesOverview: result.workerResult.domainResult.matchesOverview,
              projects: result.workerResult.domainResult.projects,
              skills: result.workerResult.domainResult.skills,
            },
            domain: result.workerResult.domainResult,
            worker: result.workerResult,
          }
        : {}),
    }))
  );

  setQuery(query: string[]): void {
    if (typeof Worker === 'undefined') {
      // TODO web-worker: implement fallback logic for environments without web worker support
      // consider *where* to implement fallback (in runtime:angular or in runtime:worker)
      throw new Error('Web Workers are not supported in this environment.');
    }

    const worker = this.getOrCreateWorker();
    this.queryIdCounter++;
    this.resultSubject.next({
      queryId: this.queryIdCounter,
      serviceData: { loading: true, progressPercent: 0 },
    });
    worker.postMessage({
      kind: SEARCH_ENGINE_WORKER_REQUEST_KIND,
      queryId: this.queryIdCounter,
      query,
    });
  }

  ngOnDestroy(): void {
    this.destroyWorker();
  }

  private getOrCreateWorker(): Worker {
    if (!this.worker) {
      this.worker = createSearchEngineWorker();

      this.worker.onmessage = ({
        data,
      }: MessageEvent<SearchEngineWorkerOutput>) => {
        if (isWorkerProgressMessage(data)) {
          this.resultSubject.next({
            queryId: data.queryId,
            serviceData: {
              loading: true,
              progressPercent: data.progressPercent,
            },
          });
          return;
        }

        const workerResultReceivedTimestamp =
          performance.timeOrigin + performance.now();
        const workerMessageLatencyMs =
          workerResultReceivedTimestamp - data.workerFinishedTimestamp;
        this.resultSubject.next({
          queryId: data.queryId,
          workerResult: data,
          serviceData: {
            loading: false,
            progressPercent: 100,
            workerMessageLatencyMs,
          },
        });
      };

      this.worker.onerror = error => {
        console.error('Worker error:', error);
      };
    }
    return this.worker;
  }

  private destroyWorker(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = undefined;
    }
  }
}

function isWorkerProgressMessage(
  output: SearchEngineWorkerOutput
): output is SearchEngineWorkerProgress {
  return output.kind === SEARCH_ENGINE_WORKER_PROGRESS_KIND;
}
