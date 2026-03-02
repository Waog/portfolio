export interface SearchEngineWorkerInput {
  queryId: number;
  query: string[];
}

export interface SearchEngineWorkerResult {
  queryId: number;
  query: string[];
  random: number;
  durationMs: number;
  workerFinishedTimestamp: number;
}
