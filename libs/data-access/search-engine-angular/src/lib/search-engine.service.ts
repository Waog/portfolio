import { Injectable, OnDestroy } from '@angular/core';
import {
  createSearchEngineWorker,
  SearchEngineWorkerResult,
} from '@portfolio/search-engine-worker';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';

// TODO web-worker: ensure import boundaries for new nx `runtime:*` tags

export type SearchResult =
  | {
      loading: boolean;
    }
  | SearchEngineWorkerResult;

@Injectable({
  providedIn: 'root',
})
export class SearchEngineService implements OnDestroy {
  private worker?: Worker;
  private queryIdCounter = 0;
  // undefined = loading
  private readonly workerResultSubject = new BehaviorSubject<
    SearchEngineWorkerResult | undefined
  >(undefined);

  readonly searchResult$: Observable<SearchResult> =
    this.workerResultSubject.pipe(
      filter(
        (result: SearchEngineWorkerResult | undefined) =>
          !result || result.queryId === this.queryIdCounter
      ),
      map(workerResult => ({
        loading: !workerResult,
        ...workerResult,
      }))
    );

  setQuery(query: string[]): void {
    if (typeof Worker === 'undefined') {
      // TODO web-worker: implement fallback logic for environments without web worker support
      // consider *where* to implement fallback (in runtime:angular or in runtime:worker)
      throw new Error('Web Workers are not supported in this environment.');
    }

    this.workerResultSubject.next(undefined);

    const worker = this.getOrCreateWorker();
    this.queryIdCounter++;
    worker.postMessage({ queryId: this.queryIdCounter, query });
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
        this.workerResultSubject.next(data);
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
