import { Memoize } from 'typescript-memoize';

import { allArgsHasher } from './all-args-hasher';

/**
 * Since the `typescript-memoize` library does not handle all arguments well by default,
 * this wrapper was introduced to ensure that all arguments are considered for caching.
 * Usage:
 * ```
 * @MemoizeAllArgs
 * yourMethod(arg1, arg2, ...): ReturnType { ... }
 * ```
 */
export const MemoizeAllArgs: MethodDecorator = (
  target,
  propertyKey,
  descriptor
) => {
  return Memoize(allArgsHasher)(target, propertyKey as string, descriptor);
};
