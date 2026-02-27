import { Injectable } from '@angular/core';
import { CachedRandom } from '@portfolio/proof-of-concept';
import { Observable } from 'rxjs';

export interface MemoizeResult {
  input: string;
  result: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProofOfConceptMemoizeWorkerService {
  private worker?: Worker;

  run(input: string): Observable<MemoizeResult> {
    return new Observable(observer => {
      if (typeof Worker === 'undefined') {
        const cachedRandom = new CachedRandom();
        observer.next(cachedRandom.forInput(input));
        observer.complete();
        return;
      }

      const worker = this.getOrCreateWorker();

      worker.onmessage = ({ data }: MessageEvent<MemoizeResult>) => {
        observer.next(data);
        observer.complete();
      };

      worker.onerror = error => {
        observer.error(error);
      };

      worker.postMessage(input);
    });
  }

  private getOrCreateWorker(): Worker {
    if (!this.worker) {
      this.worker = new Worker(
        new URL('./proof-of-concept-memoize.worker', import.meta.url),
        { type: 'module' }
      );
    }
    return this.worker;
  }
}
