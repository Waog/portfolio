addEventListener('message', ({ data }: MessageEvent<string>) => {
  setTimeout(() => {
    postMessage({
      data,
      random: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
    });
  }, 2000);
});

export {};
