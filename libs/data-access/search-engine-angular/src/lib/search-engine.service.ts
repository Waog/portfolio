import { Injectable, OnDestroy } from '@angular/core';
import { SearchEngineDomainResult } from '@portfolio/search-engine-domain';
import {
  createSearchEngineWorker,
  SEARCH_ENGINE_WORKER_REQUEST_KIND,
  SearchEngineWorkerResult,
} from '@portfolio/search-engine-worker';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';

// TODO web-worker: ensure import boundaries for new nx `runtime:*` tags

export type SearchResult = {
  loading: boolean;
  ui?: {
    matchesOverview: SearchEngineDomainResult['matchesOverview'];
    skills: SearchEngineDomainResult['skills'];
  };
  ngService?: { loading: boolean; workerMessageLatencyMs?: number };
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
    workerResult?: SearchEngineWorkerResult;
    serviceData: { loading: boolean; workerMessageLatencyMs?: number };
  }>({ serviceData: { loading: true } });

  readonly searchResult$: Observable<SearchResult> = this.resultSubject.pipe(
    tap(result => {
      console.log('SearchEngineService resultSubject emitted:', result, {
        queryIdCounter: this.queryIdCounter,
      });
    }),
    filter(
      result =>
        result.serviceData.loading ||
        result.workerResult?.queryId === this.queryIdCounter
    ),
    map(result => ({
      loading: result.serviceData.loading,
      ...(!result.serviceData.loading && result.workerResult
        ? {
            ngService: result.serviceData,
            ui: {
              matchesOverview: result.workerResult.domainResult.matchesOverview,
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

    this.resultSubject.next({ serviceData: { loading: true } });

    const worker = this.getOrCreateWorker();
    this.queryIdCounter++;
    worker.postMessage({
      kind: SEARCH_ENGINE_WORKER_REQUEST_KIND,
      queryId: this.queryIdCounter,
      query,
    });
    console.log('TODO web-worker: sent to web-worker:', {
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
      }: MessageEvent<SearchEngineWorkerResult>) => {
        const workerResultReceivedTimestamp =
          performance.timeOrigin + performance.now();
        const workerMessageLatencyMs =
          workerResultReceivedTimestamp - data.workerFinishedTimestamp;
        console.log('TODO web-worker: received from web-worker:', data, {
          workerMessageLatencyMs,
        });
        this.resultSubject.next({
          workerResult: data,
          serviceData: { loading: false, workerMessageLatencyMs },
        });
      };

      this.worker.onerror = error => {
        // TODO web-worker: implement proper error handling
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
