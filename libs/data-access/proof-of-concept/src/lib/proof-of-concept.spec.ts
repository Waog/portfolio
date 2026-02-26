import { transform } from './proof-of-concept';

describe('transform', () => {
  it('should return { result: input } for any input string', () => {
    expect(transform('X')).toEqual({ result: 'X' });
    expect(transform('hello')).toEqual({ result: 'hello' });
    expect(transform('')).toEqual({ result: '' });
  });
});
