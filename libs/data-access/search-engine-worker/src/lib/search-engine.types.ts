import { SearchEngineDomainResult } from '@portfolio/search-engine-domain';

export const SEARCH_ENGINE_WORKER_REQUEST_KIND =
  'search-engine.request' as const;

export const SEARCH_ENGINE_WORKER_PROGRESS_KIND =
  'search-engine.progress' as const;

export const SEARCH_ENGINE_WORKER_RESULT_KIND = 'search-engine.result' as const;

export interface SearchEngineWorkerInput {
  kind: typeof SEARCH_ENGINE_WORKER_REQUEST_KIND;
  queryId: number;
  query: string[];
}

export interface SearchEngineWorkerResult {
  kind: typeof SEARCH_ENGINE_WORKER_RESULT_KIND;
  queryId: number;
  query: string[];
  durationMs: number;
  workerFinishedTimestamp: number;
  domainResult: SearchEngineDomainResult;
}

export interface SearchEngineWorkerProgress {
  kind: typeof SEARCH_ENGINE_WORKER_PROGRESS_KIND;
  queryId: number;
  query: string[];
  progressPercent: number;
}

export type SearchEngineWorkerOutput =
  | SearchEngineWorkerProgress
  | SearchEngineWorkerResult;
