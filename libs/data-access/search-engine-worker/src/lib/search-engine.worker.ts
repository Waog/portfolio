import {
  SearchEngineDomain,
  SearchEngineDomainChunkResult,
  SearchEngineDomainResult,
} from '@portfolio/search-engine-domain';

import {
  SEARCH_ENGINE_WORKER_PROGRESS_KIND,
  SEARCH_ENGINE_WORKER_REQUEST_KIND,
  SEARCH_ENGINE_WORKER_RESULT_KIND,
  SearchEngineWorkerInput,
  SearchEngineWorkerOutput,
  SearchEngineWorkerProgress,
  SearchEngineWorkerResult,
} from './search-engine.types';

const searchEngineDomain = new SearchEngineDomain();
let latestRequest: SearchEngineWorkerInput | null = null;
let isProcessing = false;

addEventListener('message', ({ data }: MessageEvent<unknown>) => {
  if (!isSearchEngineWorkerInput(data)) {
    return;
  }

  latestRequest = data;

  if (isProcessing) {
    return;
  }

  processLatestRequests();
});

async function processLatestRequests(): Promise<void> {
  isProcessing = true;

  try {
    while (latestRequest) {
      const request = latestRequest;
      const { queryId, query } = request;
      let lastProgressPercent = -1;
      const startedAt = performance.now();

      searchEngineDomain.initialize(query);

      while (latestRequest?.queryId === queryId) {
        const chunkResult = searchEngineDomain.processChunk();

        if (chunkResult.progressPercent > lastProgressPercent) {
          lastProgressPercent = chunkResult.progressPercent;
          postProgressMsg(request, chunkResult);
        }

        if (chunkResult.done) {
          const domainResult = searchEngineDomain.finalize();
          postResultMsg(request, domainResult, startedAt);

          if (latestRequest?.queryId === queryId) {
            latestRequest = null;
          }
          break;
        }

        await yieldToEventLoop();
      }
    }
  } finally {
    isProcessing = false;
  }
}

function postProgressMsg(
  request: SearchEngineWorkerInput,
  chunkResult: SearchEngineDomainChunkResult
): void {
  const progressMessage: SearchEngineWorkerProgress = {
    kind: SEARCH_ENGINE_WORKER_PROGRESS_KIND,
    queryId: request.queryId,
    query: request.query,
    progressPercent: chunkResult.progressPercent,
  };
  postWorkerMessage(progressMessage);
}

function postResultMsg(
  request: SearchEngineWorkerInput,
  domainResult: SearchEngineDomainResult,
  startedAt: number
): void {
  const result: SearchEngineWorkerResult = {
    kind: SEARCH_ENGINE_WORKER_RESULT_KIND,
    queryId: request.queryId,
    query: request.query,
    durationMs: 0,
    workerFinishedTimestamp: 0,
    domainResult,
  };
  result.durationMs = performance.now() - startedAt;
  result.workerFinishedTimestamp = performance.timeOrigin + performance.now();
  postWorkerMessage(result);
}

function postWorkerMessage(message: SearchEngineWorkerOutput): void {
  postMessage(message);
}

function isSearchEngineWorkerInput(
  data: unknown
): data is SearchEngineWorkerInput {
  return (
    (data as SearchEngineWorkerInput)?.kind ===
    SEARCH_ENGINE_WORKER_REQUEST_KIND
  );
}

function yieldToEventLoop(): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  });
}

export {};
