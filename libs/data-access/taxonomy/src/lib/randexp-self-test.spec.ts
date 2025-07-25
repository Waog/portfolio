import RandExp = require('randexp');
import seedrandom = require('seedrandom');

describe('randexp Self-Test', () => {
  it('seedrandom self-test', () => {
    seedrandom('some-seed.', { global: true });

    expect(Math.floor(Math.random() * 1_000_000)).toEqual(85_3240);
    expect(Math.floor(Math.random() * 1_000_000)).toEqual(63_8966);
    expect(Math.floor(Math.random() * 1_000_000)).toEqual(32_1567);
  });

  it('randexp self-test', () => {
    seedrandom('some-seed.', { global: true });
    expect(new RandExp(/Random 10-digit number: [0-9]{10}/).gen()).toEqual(
      'Random 10-digit number: 6373862368'
    );
    expect(new RandExp(/Random 10-digit number: [0-9]{10}/).gen()).toEqual(
      'Random 10-digit number: 9844615886'
    );
    expect(new RandExp(/Random 3 characters: .{3}/).gen()).toEqual(
      'Random 3 characters: k6?'
    );
    expect(new RandExp(/Random 1-10 X characters: X{1,10}/).gen()).toEqual(
      'Random 1-10 X characters: XXXXXXX'
    );
  });
});
