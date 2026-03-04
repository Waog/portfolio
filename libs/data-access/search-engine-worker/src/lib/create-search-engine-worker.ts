import {
  SearchEngineWorkerInput,
  SearchEngineWorkerOutput,
} from './search-engine.types';
import { runTask } from './search-engine-worker-task';

export interface SearchEngineWorker {
  postMessage(input: SearchEngineWorkerInput): void;
  terminate(): void;
}

export function createSearchEngineWorker(
  onMessageCallback: (event: SearchEngineWorkerOutput) => void,
  onErrorCallback: (error: ErrorEvent) => void
): SearchEngineWorker {
  if (typeof Worker === 'undefined') {
    console.warn(
      'Web Workers are not supported in this environment. Falling back to main-thread execution.'
    );
    return {
      postMessage: (input: SearchEngineWorkerInput) => {
        try {
          runTask(input, onMessageCallback);
        } catch (error) {
          const errorEvent = new ErrorEvent('error', {
            error,
            message: (error as any)?.message ?? String(error),
          });
          onErrorCallback(errorEvent);
        }
      },
      terminate: () => {
        console.warn(
          'Terminate called on main-thread fallback. No action taken.'
        );
      },
    };
  }

  const worker = new Worker(
    new URL('./search-engine.worker', import.meta.url),
    {
      type: 'module',
    }
  );

  worker.onmessage = ({ data }: MessageEvent<SearchEngineWorkerOutput>) => {
    onMessageCallback(data);
  };

  worker.onerror = (error: ErrorEvent) => {
    onErrorCallback(error);
  };

  return worker;
}
