import { SearchEngineDomainResult } from '@portfolio/search-engine-domain';

export interface SearchEngineWorkerInput {
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
