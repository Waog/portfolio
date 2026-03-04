import {
  SEARCH_ENGINE_WORKER_REQUEST_KIND,
  SearchEngineWorkerInput,
  SearchEngineWorkerOutput,
} from './search-engine.types';
import { runTask } from './search-engine-worker-task';

addEventListener('message', ({ data }: MessageEvent<unknown>) => {
  if (!isSearchEngineWorkerInput(data)) {
    return;
  }

  runTask(data, postWorkerMessage);
});

function isSearchEngineWorkerInput(
  data: unknown
): data is SearchEngineWorkerInput {
  return (
    (data as SearchEngineWorkerInput)?.kind ===
    SEARCH_ENGINE_WORKER_REQUEST_KIND
  );
}

function postWorkerMessage(message: SearchEngineWorkerOutput): void {
  postMessage(message);
}

export {};
