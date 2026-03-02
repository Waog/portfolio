import { SearchEngineDomainResult } from '@portfolio/search-engine-domain';

export const SEARCH_ENGINE_WORKER_REQUEST_KIND =
  'search-engine.request' as const;

export interface SearchEngineWorkerInput {
  kind: typeof SEARCH_ENGINE_WORKER_REQUEST_KIND;
  queryId: number;
  query: string[];
}

export interface SearchEngineWorkerResult {
  queryId: number;
  query: string[];
  workerRandom: number; // TODO web-worker: remove debug field
  durationMs: number;
  workerFinishedTimestamp: number;
  domainResult: SearchEngineDomainResult;
}
