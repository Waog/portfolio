import { CachedRandom } from '@portfolio/proof-of-concept';

const cachedRandom = new CachedRandom();

addEventListener('message', ({ data }: MessageEvent<string>) => {
  postMessage(cachedRandom.forInput(data));
});
