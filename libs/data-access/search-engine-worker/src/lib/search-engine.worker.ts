import {
  SearchEngineWorkerInput,
  SearchEngineWorkerResult,
} from './search-engine.types';

addEventListener(
  'message',
  ({ data }: MessageEvent<SearchEngineWorkerInput>) => {
    const startTime = performance.now();

    // TODO web-worker: yield to monitor incoming searchIds. Abort if newer searchId received.
    setTimeout(() => {
      const result: SearchEngineWorkerResult = {
        queryId: data.queryId,
        query: data.query,
        random: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
        durationMs: performance.now() - startTime,
        workerFinishedTimestamp: performance.timeOrigin + performance.now(),
      };

      postMessage(result);
    }, 20000);
  }
);

export {};
