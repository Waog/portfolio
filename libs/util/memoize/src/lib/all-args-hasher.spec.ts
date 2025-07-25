import { allArgsHasher } from './all-args-hasher';

describe('allArgsHasher', () => {
  it('returns a string', () => {
    expect(typeof allArgsHasher('test')).toBe('string');
  });

  it('returns the same hash no parameters', () => {
    expect(allArgsHasher()).toBe(allArgsHasher());
  });

  it('returns the same hash for equal primitives', () => {
    expect(allArgsHasher(1)).toBe(allArgsHasher(1));
    expect(allArgsHasher('foo')).toBe(allArgsHasher('foo'));
    expect(allArgsHasher(true)).toBe(allArgsHasher(true));
    expect(allArgsHasher(null)).toBe(allArgsHasher(null));
    expect(allArgsHasher(undefined)).toBe(allArgsHasher(undefined));
    expect(allArgsHasher(Symbol.for('sym'))).toBe(
      allArgsHasher(Symbol.for('sym'))
    );
  });

  it('returns the same hash for equal arrays', () => {
    expect(allArgsHasher([1, 2, 3])).toBe(allArgsHasher([1, 2, 3]));
    expect(allArgsHasher(['a', 'b'])).toBe(allArgsHasher(['a', 'b']));
  });

  it('returns the same hash for equal objects', () => {
    expect(allArgsHasher({ a: 1, b: 2 })).toBe(allArgsHasher({ a: 1, b: 2 }));
    expect(allArgsHasher({ b: 2, a: 1 })).toBe(allArgsHasher({ a: 1, b: 2 }));
  });

  it('returns different hashes for different primitives', () => {
    expect(allArgsHasher(1)).not.toBe(allArgsHasher(2));
    expect(allArgsHasher('foo')).not.toBe(allArgsHasher('bar'));
    expect(allArgsHasher(true)).not.toBe(allArgsHasher(false));
    expect(allArgsHasher(null)).not.toBe(allArgsHasher(undefined));
  });

  it('returns different hashes for different arrays', () => {
    expect(allArgsHasher([1, 2, 3])).not.toBe(allArgsHasher([3, 2, 1]));
    expect(allArgsHasher(['a', 'b'])).not.toBe(allArgsHasher(['b', 'a']));
  });

  it('returns different hashes for different objects', () => {
    expect(allArgsHasher({ a: 1, b: 2 })).not.toBe(
      allArgsHasher({ a: 2, b: 1 })
    );
    expect(allArgsHasher({ a: 1 })).not.toBe(allArgsHasher({ a: 1, b: 2 }));
  });

  it('returns the same hash for equal multiple arguments', () => {
    expect(allArgsHasher(1, 'a', [2, 3], { b: 4 })).toBe(
      allArgsHasher(1, 'a', [2, 3], { b: 4 })
    );
  });

  it('returns different hashes for different multiple arguments', () => {
    expect(allArgsHasher(1, 'a', [2, 3], { b: 4 })).not.toBe(
      allArgsHasher(1, 'a', [2, 3], { b: 5 })
    );
    expect(allArgsHasher(1, 'a', [2, 3], { b: 4 })).not.toBe(
      allArgsHasher(1, 'a', [2, 4], { b: 4 })
    );
  });

  it('handles nested objects and arrays', () => {
    const a = { x: [1, { y: 2 }] };
    const b = { x: [1, { y: 2 }] };
    const c = { x: [1, { y: 3 }] };
    expect(allArgsHasher(a)).toBe(allArgsHasher(b));
    expect(allArgsHasher(a)).not.toBe(allArgsHasher(c));
  });

  it('returns the same hash for equal regexes', () => {
    expect(allArgsHasher(/abc/)).toBe(allArgsHasher(/abc/));
    expect(allArgsHasher(new RegExp('abc', 'i'))).toBe(
      allArgsHasher(new RegExp('abc', 'i'))
    );
  });

  it('returns different hashes for different regexes', () => {
    expect(allArgsHasher(/abc/)).not.toBe(allArgsHasher(/def/));
    expect(allArgsHasher(/abc/i)).not.toBe(allArgsHasher(/abc/g));
    expect(allArgsHasher(/abc/)).not.toBe(allArgsHasher(/abc/i));
  });
});
