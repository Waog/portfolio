import { SearchEngineDomain } from '@portfolio/search-engine-domain';

import {
  SEARCH_ENGINE_WORKER_REQUEST_KIND,
  SearchEngineWorkerInput,
  SearchEngineWorkerResult,
} from './search-engine.types';

const searchEngineDomain = new SearchEngineDomain();

addEventListener('message', ({ data }: MessageEvent<unknown>) => {
  if (!isSearchEngineWorkerInput(data)) {
    return;
  }

  const startTime = performance.now();

  // TODO web-worker: yield to monitor incoming searchIds. Abort if newer searchId received.
  setTimeout(() => {
    const result: SearchEngineWorkerResult = {
      queryId: data.queryId,
      query: data.query,
      workerRandom: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      durationMs: performance.now() - startTime,
      workerFinishedTimestamp: performance.timeOrigin + performance.now(),
      domainResult: searchEngineDomain.get(data.query),
    };

    postMessage(result);
  }, 0);
});

function isSearchEngineWorkerInput(
  data: unknown
): data is SearchEngineWorkerInput {
  return (
    (data as SearchEngineWorkerInput)?.kind ===
    SEARCH_ENGINE_WORKER_REQUEST_KIND
  );
}

export {};
