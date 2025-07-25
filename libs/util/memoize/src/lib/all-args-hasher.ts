import * as objectHash from 'object-hash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const allArgsHasher = (...args: any[]) => objectHash(args);

// export const allArgsHasher = (...args: any[]): string => JSON.stringify(args);
