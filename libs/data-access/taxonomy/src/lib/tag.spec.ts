import { Tag } from './Tag';

describe('Tag', () => {
  describe('static get()', () => {
    it('can create', () => {
      expect(Tag.get('Angular')).toBeInstanceOf(Tag);
    });

    it('can create with synonyms', () => {
      expect(Tag.get('TS')).toBeInstanceOf(Tag);
    });

    it('creates multiple objects', () => {
      expect(Tag.get('JavaScript')).not.toEqual(Tag.get('TypeScript'));
    });

    it('reuses existing objects', () => {
      const tag1 = Tag.get('JavaScript');
      const tag2 = Tag.get('JS');
      const tag3 = Tag.get('JavaScript');
      expect(tag1).toBe(tag2);
      expect(tag2).toBe(tag3);
    });

    it('throws for unknown terms', () => {
      expect(() => Tag.get('some unknown term')).toThrow();
    });

    it('throws for multiple times for terms', () => {
      expect(() => Tag.get('some unknown term')).toThrow();
      expect(() => Tag.get('some unknown term')).toThrow();
    });
  });

  describe('is()', () => {
    it('matches canonical name', () => {
      expect(Tag.get('TS').is('TypeScript')).toBe(true);
    });

    it('matches synonyms', () => {
      expect(Tag.get('JavaScript').is('JS')).toBe(true);
    });

    it('does not match different terms', () => {
      expect(Tag.get('JavaScript').is('TypeScript')).toBe(false);
    });
  });

  describe('isA()', () => {
    it('matches direct parent canonical', () => {
      expect(Tag.get('React').isA('Frontend Framework')).toBe(true);
    });

    it('matches direct parent synonym', () => {
      expect(Tag.get('React').isA('JS Framework')).toBe(true);
    });

    it('matches indirect parent canonical', () => {
      expect(Tag.get('React Native').isA('Frontend Framework')).toBe(true);
    });

    it('matches indirect parent synonym', () => {
      expect(Tag.get('React Native').isA('JS Framework')).toBe(true);
    });

    it('does not match non-parents', () => {
      expect(Tag.get('React Native').isA('Backend')).toBe(false);
    });
  });

  describe('hasChild()', () => {
    it('matches direct child canonical', () => {
      expect(Tag.get('Frontend Framework').hasChild('React')).toBe(true);
    });

    it('matches direct child synonym', () => {
      expect(Tag.get('JavaScript').hasChild('TS')).toBe(true);
    });

    it('does not match indirect child', () => {
      expect(Tag.get('Frontend Framework').hasChild('React Native')).toBe(
        false
      );
    });

    it('does not match non-child term', () => {
      expect(Tag.get('JavaScript').hasChild('CSS')).toBe(false);
    });
  });

  describe('isSibling()', () => {
    it('matches sibling canonical', () => {
      expect(Tag.get('React').isSibling('Angular')).toBe(true);
    });

    it('matches sibling synonym', () => {
      expect(Tag.get('Angular').isSibling('React.js')).toBe(true);
    });

    it('does not match non-sibling', () => {
      expect(Tag.get('React').isSibling('CSS')).toBe(false);
    });
  });

  describe('getDistanceToAncestor()', () => {
    it('returns 0 for identical element', () => {
      expect(Tag.get('React').getDistanceToAncestor('React')).toBe(0);
    });

    it('return 1 for direct parent', () => {
      expect(Tag.get('React Native').getDistanceToAncestor('React')).toBe(1);
    });

    it('returns 2 for grand parent', () => {
      expect(
        Tag.get('React Native').getDistanceToAncestor('Frontend Framework')
      ).toBe(2);
    });

    it('returns `null` for non-ancestor', () => {
      expect(Tag.get('React').getDistanceToAncestor('RxJS')).toBeNull();
    });
  });

  describe('getAllAncestors()', () => {
    it('returns a set of all ancestors', () => {
      expect(Tag.get('React Web').getAllAncestors()).toEqual(
        new Set(['React', 'Frontend Framework', 'Framework'])
      );
    });

    it('returns an empty set if there are no ancestors', () => {
      expect(Tag.get('Framework').getAllAncestors()).toEqual(new Set());
    });
  });

  describe('getAllCommonAncestors()', () => {
    it('returns a set of all common ancestors', () => {
      expect(Tag.get('React Web').getAllCommonAncestors('Angular')).toEqual(
        new Set(['Frontend Framework', 'Framework'])
      );
    });

    it('returns an empty set if there are no common ancestors', () => {
      expect(Tag.get('CSS').getAllCommonAncestors('HTML')).toEqual(new Set());
    });
  });

  describe('getLowestCommonAncestor()', () => {
    it('returns the element itself, if comparing to itself', () => {
      expect(Tag.get('Angular').getLowestCommonAncestor('Angular')).toEqual(
        'Angular'
      );
    });

    it('returns the direct ancestor if comparing to an element with its direct ancestor', () => {
      expect(
        Tag.get('Frontend Framework').getLowestCommonAncestor('React Native')
      ).toEqual('Frontend Framework');

      expect(
        Tag.get('React Native').getLowestCommonAncestor('Frontend Framework')
      ).toEqual('Frontend Framework');
    });

    it('returns a the common ancestors', () => {
      expect(Tag.get('React Web').getLowestCommonAncestor('Angular')).toEqual(
        'Frontend Framework'
      );
    });

    it('returns null if there is no common ancestor', () => {
      expect(Tag.get('CSS').getLowestCommonAncestor('HTML')).toEqual(null);
    });
  });

  describe('getMinDistanceToLowestCommonAncestor()', () => {
    it('returns 0 for the element itself', () => {
      expect(
        Tag.get('React').getMinDistanceToLowestCommonAncestor('React')
      ).toEqual(0);
    });

    it('returns 0 if one element is the ancestor of the other', () => {
      expect(
        Tag.get('Frontend Framework').getMinDistanceToLowestCommonAncestor(
          'React Native'
        )
      ).toEqual(0);

      expect(
        Tag.get('React Native').getMinDistanceToLowestCommonAncestor(
          'Frontend Framework'
        )
      ).toEqual(0);
    });

    it('returns 1 if the lowest common ancestor is a direct parent of one participant', () => {
      expect(
        Tag.get('Angular').getMinDistanceToLowestCommonAncestor('React Native')
      ).toEqual(1);
    });

    it('returns null if there is no common ancestor', () => {
      expect(
        Tag.get('CSS').getMinDistanceToLowestCommonAncestor('HTML')
      ).toEqual(null);
    });
  });

  describe('includes()', () => {
    it('returns true for the element itself', () => {
      expect(Tag.get('Angular').includes('Angular')).toEqual(true);
    });

    it('returns true for ancestors of the element', () => {
      expect(Tag.get('React Web').includes('Frontend Framework')).toEqual(true);
    });

    it('returns true if the term is included directly', () => {
      expect(Tag.get('Angular').includes('HTML')).toEqual(true);
    });

    it('returns true if the term is included in an included member', () => {
      expect(Tag.get('Angular').includes('CSS')).toEqual(true);
    });

    it('returns true if the term is included in any ancestor', () => {
      expect(Tag.get('React Native').includes('JavaScript')).toEqual(true);
    });

    it('returns false if the term is not included in any way', () => {
      expect(Tag.get('React').includes('AWS')).toEqual(false);
    });
  });

  describe('related()', () => {
    it('returns true for the element itself', () => {
      expect(Tag.get('Angular').isRelated('Angular')).toEqual(true);
    });

    it('returns true for directly related elements', () => {
      expect(Tag.get('Angular').isRelated('RxJS')).toEqual(true);
    });

    it('returns false if only indirectly related', () => {
      expect(Tag.get('SASS').isRelated('CSS')).toEqual(false);
    });

    it('returns false if not related', () => {
      expect(Tag.get('React').isRelated('AWS')).toEqual(false);
    });
  });
});
