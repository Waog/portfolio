import { Tag } from './Tag';

describe('Tag', () => {
  describe('constructor', () => {
    it('can create', () => {
      expect(new Tag('Angular')).toBeInstanceOf(Tag);
    });

    it('can create with synonyms', () => {
      expect(new Tag('TS')).toBeInstanceOf(Tag);
    });

    it('fails to create with unknown terms', () => {
      expect(() => new Tag('some unknown term')).toThrow();
    });
  });

  describe('is()', () => {
    it('matches canonical name', () => {
      expect(new Tag('TS').is('TypeScript')).toBe(true);
    });

    it('matches synonyms', () => {
      expect(new Tag('JavaScript').is('JS')).toBe(true);
    });

    it('does not match different terms', () => {
      expect(new Tag('JavaScript').is('TypeScript')).toBe(false);
    });
  });

  describe('isA()', () => {
    it('matches direct parent canonical', () => {
      expect(new Tag('React').isA('Frontend Framework')).toBe(true);
    });

    it('matches direct parent synonym', () => {
      expect(new Tag('React').isA('JS Framework')).toBe(true);
    });

    it('matches indirect parent canonical', () => {
      expect(new Tag('React Native').isA('Frontend Framework')).toBe(true);
    });

    it('matches indirect parent synonym', () => {
      expect(new Tag('React Native').isA('JS Framework')).toBe(true);
    });

    it('does not match non-parents', () => {
      expect(new Tag('React Native').isA('Backend')).toBe(false);
    });
  });

  describe('hasChild()', () => {
    it('matches direct child canonical', () => {
      expect(new Tag('Frontend Framework').hasChild('React')).toBe(true);
    });

    it('matches direct child synonym', () => {
      expect(new Tag('JavaScript').hasChild('TS')).toBe(true);
    });

    it('does not match indirect child', () => {
      expect(new Tag('Frontend Framework').hasChild('React Native')).toBe(
        false
      );
    });

    it('does not match non-child term', () => {
      expect(new Tag('JavaScript').hasChild('CSS')).toBe(false);
    });
  });

  describe('isSibling()', () => {
    it('matches sibling canonical', () => {
      expect(new Tag('React').isSibling('Angular')).toBe(true);
    });

    it('matches sibling synonym', () => {
      expect(new Tag('Angular').isSibling('React.js')).toBe(true);
    });

    it('does not match non-sibling', () => {
      expect(new Tag('React').isSibling('CSS')).toBe(false);
    });
  });
});
