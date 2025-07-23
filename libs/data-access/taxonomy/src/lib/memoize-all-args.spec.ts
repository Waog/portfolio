import { MemoizeAllArgs } from './memoize-all-args';

// TODO taxonomy: move to own nx library
describe('MemoizeAllArgs', () => {
  it('1 static method, no params is cached', () => {
    expect(SomeMemoizeClass.staticNoParamMethod()).toBe(
      SomeMemoizeClass.staticNoParamMethod()
    );
  });

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

  it('1 object, 1 method, 2 primitive params is cached caching', () => {
    const instance = new SomeMemoizeClass();
    expect(instance.twoParamMethod('test1', 'test2')).toBe(
      instance.twoParamMethod('test1', 'test2')
    );
  });

  it('1 object, 1 method, 2 primitive params use different cache for different second param values', () => {
    const instance = new SomeMemoizeClass();
    expect(instance.twoParamMethod('test1', 'test2')).not.toBe(
      instance.twoParamMethod('test1', 'different')
    );
  });

  it('1 object, 1 method, 1 object param is cached for equal objects', () => {
    const instance = new SomeMemoizeClass();
    const paramA = { root: 'test', child: { a: 'a', b: 'b' } };
    const paramB = { root: 'test', child: { a: 'a', b: 'b' } };
    expect(paramA).not.toBe(paramB);
    expect(paramA).toEqual(paramB);
    expect(instance.oneObjectParamMethod(paramA)).toBe(
      instance.oneObjectParamMethod(paramB)
    );
  });

  it('1 object, 1 method, 1 object param is returns different results for deeply different objects', () => {
    const instance = new SomeMemoizeClass();
    const paramA = { root: 'test', child: { a: 'a', b: 'b' } };
    const paramB = { root: 'test', child: { a: 'a', b: 'c' } };
    expect(paramA).not.toBe(paramB);
    expect(paramA).not.toEqual(paramB);
    expect(instance.oneObjectParamMethod(paramA)).not.toBe(
      instance.oneObjectParamMethod(paramB)
    );
  });

  it('1 object, 1 method, 1 array param is returns same results for equal arrays', () => {
    const instance = new SomeMemoizeClass();
    const paramA = ['a', 'b'];
    const paramB = ['a', 'b'];
    expect(paramA).not.toBe(paramB);
    expect(paramA).toEqual(paramB);
    expect(instance.oneArrayParamMethod(paramA)).toBe(
      instance.oneArrayParamMethod(paramB)
    );
  });

  it('1 object, 1 method, 1 array param is returns different results for deeply different objects', () => {
    const instance = new SomeMemoizeClass();
    const paramA = ['a', 'b'];
    const paramB = ['a', 'c'];
    expect(paramA).not.toBe(paramB);
    expect(paramA).not.toEqual(paramB);
    expect(instance.oneArrayParamMethod(paramA)).not.toBe(
      instance.oneArrayParamMethod(paramB)
    );
  });

  it('1 object, 1 method, 2 complex param is returns same results for equal params', () => {
    const instance = new SomeMemoizeClass();
    const param1A = { a: 'a', b: { c: 'c', d: 'd' } };
    const param1B = { a: 'a', b: { c: 'c', d: 'd' } };

    const param2A = { foo: [{ a: 'a' }, { c: 'c' }] };
    const param2B = { foo: [{ a: 'a' }, { c: 'c' }] };

    expect(param1A).not.toBe(param1B);
    expect(param1A).toEqual(param1B);

    expect(param2A).not.toBe(param2B);
    expect(param2A).toEqual(param2B);

    expect(instance.twoComplexParamMethod(param1A, param2A)).toBe(
      instance.twoComplexParamMethod(param1B, param2B)
    );
  });

  it('1 object, 1 method, 2 complex param is returns different results for deeply different params', () => {
    const instance = new SomeMemoizeClass();
    const param1A = { a: 'a', b: { c: 'c', d: 'd' } };
    const param1B = { a: 'a', b: { c: 'c', d: 'd' } };

    const param2A = { foo: [{ a: 'a' }, { c: 'c' }] };
    const param2B = { foo: [{ a: 'a' }, { c: 'different' }] };

    expect(param1A).not.toBe(param1B);
    expect(param1A).toEqual(param1B);

    expect(param2A).not.toBe(param2B);
    expect(param2A).not.toEqual(param2B);

    expect(instance.twoComplexParamMethod(param1A, param2A)).not.toBe(
      instance.twoComplexParamMethod(param1B, param2B)
    );
  });

  it('1 object, 1 method thrown errors are never cached', () => {
    const instance = new SomeMemoizeClass();
    let error1: Error;
    let error2: Error;

    try {
      instance.throwingMethod();
    } catch (e) {
      error1 = e as Error;
    }
    try {
      instance.throwingMethod();
    } catch (e) {
      error2 = e as Error;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(error1!).not.toBe(error2!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(error1!.message).not.toBe(error2!.message);
  });
});

class SomeMemoizeClass {
  @MemoizeAllArgs
  static staticNoParamMethod(): { rnd: number } {
    return { rnd: SomeMemoizeClass.rnd() };
  }

  @MemoizeAllArgs
  noParamMethod(): { rnd: number } {
    return { rnd: SomeMemoizeClass.rnd() };
  }

  @MemoizeAllArgs
  primitiveParamMethod(s: string): { rnd: string } {
    return { rnd: s + SomeMemoizeClass.rnd() };
  }

  @MemoizeAllArgs
  twoParamMethod(s: string, t: string): { rnd: string } {
    return { rnd: s + t + SomeMemoizeClass.rnd() };
  }

  @MemoizeAllArgs
  oneObjectParamMethod(param: {
    root: string;
    child: { a: string; b: string };
  }): { rnd: string } {
    return {
      rnd: param.root + param.child.a + param.child.b + SomeMemoizeClass.rnd(),
    };
  }

  @MemoizeAllArgs
  oneArrayParamMethod(param: Array<string>): { rnd: string } {
    return {
      rnd: param.join(',') + SomeMemoizeClass.rnd(),
    };
  }

  @MemoizeAllArgs
  twoComplexParamMethod(a: object, b: object): { rnd: string } {
    return {
      rnd: JSON.stringify(a) + JSON.stringify(b) + SomeMemoizeClass.rnd(),
    };
  }

  @MemoizeAllArgs
  throwingMethod(): void {
    throw new Error(
      'This method is not supposed to be called' + SomeMemoizeClass.rnd()
    );
  }

  private static rnd(): number {
    return Math.floor(Math.random() * 1000000);
  }
}
