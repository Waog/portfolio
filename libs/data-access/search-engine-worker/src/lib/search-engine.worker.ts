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
      durationMs: 0,
      workerFinishedTimestamp: 0,
      domainResult: searchEngineDomain.get(data.query),
    };
    result.workerFinishedTimestamp = performance.timeOrigin + performance.now();
    result.durationMs = performance.now() - startTime;

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
