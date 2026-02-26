import { Injectable } from '@angular/core';
import { transform } from '@portfolio/proof-of-concept';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProofOfConceptWorkerService {
  /**
   * Executes `transform(input)` in a Web Worker thread.
   * Falls back to synchronous execution in SSR environments where Worker is unavailable.
   */
  run(input: string): Observable<{ result: string }> {
    return new Observable(observer => {
      if (typeof Worker === 'undefined') {
        observer.next(transform(input));
        observer.complete();
        return;
      }

      const worker = new Worker(
        new URL('./proof-of-concept.worker', import.meta.url),
        { type: 'module' }
      );

      worker.onmessage = ({ data }: MessageEvent<{ result: string }>) => {
        observer.next(data);
        observer.complete();
        worker.terminate();
      };

      worker.onerror = error => {
        observer.error(error);
        worker.terminate();
      };

      worker.postMessage(input);

      return () => worker.terminate();
    });
  }
}
