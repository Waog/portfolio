import { Memoize } from 'typescript-memoize';

import { MemoizeAllArgs } from './memoize-all-args';

// TODO taxonomy: move to own nx library
class SomeMemoizeClass {
  @Memoize()
  noParamMethod(): { rnd: number } {
    return { rnd: Math.floor(Math.random() * 1_000_000) };
  }

  @Memoize()
  primitiveParamMethod(s: string): { rnd: string } {
    return { rnd: s + Math.floor(Math.random() * 1_000_000) };
  }

  @Memoize()
  twoParamMethod(s: string, t: string): { rnd: string } {
    return { rnd: s + t + Math.floor(Math.random() * 1_000_000) };
  }

  @MemoizeAllArgs
  twoParamMethodWithAllArgsHasher(s: string, t: string): { rnd: string } {
    return { rnd: s + t + Math.floor(Math.random() * 1_000_000) };
  }

  @Memoize()
  oneObjectParamMethod(param: {
    root: string;
    child: { a: string; b: string };
  }): { rnd: string } {
    return {
      rnd:
        param.root +
        param.child.a +
        param.child.b +
        Math.floor(Math.random() * 1_000_000),
    };
  }

  @MemoizeAllArgs
  oneObjectParamMethodWithAllArgsHasher(param: {
    root: string;
    child: { a: string; b: string };
  }): { rnd: string } {
    return {
      rnd:
        param.root +
        param.child.a +
        param.child.b +
        Math.floor(Math.random() * 1_000_000),
    };
  }
}

describe('Memoize Self-Test', () => {
  it('1 object, 1 method, no params is cached', () => {
    const instance = new SomeMemoizeClass();
    expect(instance.noParamMethod()).toBe(instance.noParamMethod());
  });

  it('2 object, 1 method, no params, use different cache', () => {
    expect(new SomeMemoizeClass().noParamMethod()).not.toEqual(
      new SomeMemoizeClass().noParamMethod()
    );
  });

  it('1 object, 1 method, 1 primitive param is cached', () => {
    const instance = new SomeMemoizeClass();
    expect(instance.primitiveParamMethod('test')).toBe(
      instance.primitiveParamMethod('test')
    );
  });

  it('2 object, 1 method, 1 primitive param, use different cache', () => {
    expect(new SomeMemoizeClass().primitiveParamMethod('test')).not.toEqual(
      new SomeMemoizeClass().primitiveParamMethod('test')
    );
  });

  it('1 object, 1 method, 2 primitive param only uses first parameter for caching', () => {
    const instance = new SomeMemoizeClass();
    expect(instance.twoParamMethod('test1', 'test2')).toBe(
      instance.twoParamMethod('test1', 'different')
    );
  });

  it('2 object, 1 method, 2 primitive param, use different cache', () => {
    expect(new SomeMemoizeClass().twoParamMethod('test1', 'test2')).not.toEqual(
      new SomeMemoizeClass().twoParamMethod('test1', 'test2')
    );
  });

  it('1 object, 1 method, 2 primitive param configured with allArgsHasher use same cache', () => {
    const instance = new SomeMemoizeClass();
    expect(instance.twoParamMethodWithAllArgsHasher('test1', 'test2')).toEqual(
      instance.twoParamMethodWithAllArgsHasher('test1', 'test2')
    );
  });

  it('1 object, 1 method, 1 object param is not handled correctly by default', () => {
    const instance = new SomeMemoizeClass();
    const paramA = { root: 'test', child: { a: 'a', b: 'b' } };
    const paramB = { root: 'test', child: { a: 'a', b: 'b' } };
    expect(paramA).not.toBe(paramB);
    expect(paramA).toEqual(paramB);
    expect(instance.oneObjectParamMethod(paramA)).not.toBe(
      instance.oneObjectParamMethod(paramB)
    );
  });

  it('1 object, 1 method, 1 object param configured with allArgsHasher is handled correctly', () => {
    const instance = new SomeMemoizeClass();
    const paramA = { root: 'test', child: { a: 'a', b: 'b' } };
    const paramB = { root: 'test', child: { a: 'a', b: 'b' } };
    expect(paramA).not.toBe(paramB);
    expect(paramA).toEqual(paramB);
    expect(instance.oneObjectParamMethodWithAllArgsHasher(paramA)).toBe(
      instance.oneObjectParamMethodWithAllArgsHasher(paramB)
    );
  });
});
