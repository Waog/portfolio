import { MemoizeAllArgs } from '@portfolio/memoize';

export class CachedRandom {
  @MemoizeAllArgs
  forInput(input: string): { input: string; result: number } {
    return { input, result: Math.random() };
  }
}
