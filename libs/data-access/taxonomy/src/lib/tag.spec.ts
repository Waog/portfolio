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

  describe('getDistanceToAncestor()', () => {
    it('returns 0 for identical element', () => {
      expect(new Tag('React').getDistanceToAncestor('React')).toBe(0);
    });

    it('return 1 for direct parent', () => {
      expect(new Tag('React Native').getDistanceToAncestor('React')).toBe(1);
    });

    it('returns 2 for grand parent', () => {
      expect(
        new Tag('React Native').getDistanceToAncestor('Frontend Framework')
      ).toBe(2);
    });

    it('returns `null` for non-ancestor', () => {
      expect(new Tag('React').getDistanceToAncestor('RxJS')).toBeNull();
    });
  });

  describe('getAllAncestors()', () => {
    it('returns a set of all ancestors', () => {
      expect(new Tag('React Web').getAllAncestors()).toEqual(
        new Set(['React', 'Frontend Framework', 'Framework'])
      );
    });

    it('returns an empty set if there are no ancestors', () => {
      expect(new Tag('Framework').getAllAncestors()).toEqual(new Set());
    });
  });

  describe('getAllCommonAncestors()', () => {
    it('returns a set of all common ancestors', () => {
      expect(new Tag('React Web').getAllCommonAncestors('Angular')).toEqual(
        new Set(['Frontend Framework', 'Framework'])
      );
    });

    it('returns an empty set if there are no common ancestors', () => {
      expect(new Tag('CSS').getAllCommonAncestors('HTML')).toEqual(new Set());
    });
  });

  describe('getLowestCommonAncestor()', () => {
    it('returns the element itself, if comparing to itself', () => {
      expect(new Tag('Angular').getLowestCommonAncestor('Angular')).toEqual(
        'Angular'
      );
    });

    it('returns the direct ancestor if comparing to an element with its direct ancestor', () => {
      expect(
        new Tag('Frontend Framework').getLowestCommonAncestor('React Native')
      ).toEqual('Frontend Framework');

      expect(
        new Tag('React Native').getLowestCommonAncestor('Frontend Framework')
      ).toEqual('Frontend Framework');
    });

    it('returns a the common ancestors', () => {
      expect(new Tag('React Web').getLowestCommonAncestor('Angular')).toEqual(
        'Frontend Framework'
      );
    });

    it('returns null if there is no common ancestor', () => {
      expect(new Tag('CSS').getLowestCommonAncestor('HTML')).toEqual(null);
    });
  });

  describe('getMinDistanceToLowestCommonAncestor()', () => {
    it('returns 0 for the element itself', () => {
      expect(
        new Tag('React').getMinDistanceToLowestCommonAncestor('React')
      ).toEqual(0);
    });

    it('returns 0 if one element is the ancestor of the other', () => {
      expect(
        new Tag('Frontend Framework').getMinDistanceToLowestCommonAncestor(
          'React Native'
        )
      ).toEqual(0);

      expect(
        new Tag('React Native').getMinDistanceToLowestCommonAncestor(
          'Frontend Framework'
        )
      ).toEqual(0);
    });

    it('returns 1 if the lowest common ancestor is a direct parent of one participant', () => {
      expect(
        new Tag('Angular').getMinDistanceToLowestCommonAncestor('React Native')
      ).toEqual(1);
    });

    it('returns null if there is no common ancestor', () => {
      expect(
        new Tag('CSS').getMinDistanceToLowestCommonAncestor('HTML')
      ).toEqual(null);
    });
  });
});
