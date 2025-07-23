import * as objectHash from 'object-hash';
import { Memoize } from 'typescript-memoize';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const allArgsHasher = (...args: any[]) => objectHash(args);

// TODO taxonomy: move to own nx library
// TODO taxonomy: replace all usages of @Memoize()
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
