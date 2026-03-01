export function createSearchEngineWorker(): Worker {
  return new Worker(new URL('./search-engine.worker', import.meta.url), {
    type: 'module',
  });
}
