import { transform } from '@portfolio/proof-of-concept';

addEventListener('message', ({ data }: MessageEvent<string>) => {
  postMessage(transform(data));
});
