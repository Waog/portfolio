/**
 * Custom ESLint rule to sort arrays within objects alphabetically
 * Specifically designed for taxonomy data structure
 */

export default {
  meta: {
    type: 'layout',
    docs: {
      description: 'Sort arrays within objects alphabetically',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          arrayProperties: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of property names that should be sorted',
          },
          ignoreCase: {
            type: 'boolean',
            description: 'Whether to ignore case when sorting',
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {};
    const arrayProperties = options.arrayProperties || [];
    const ignoreCase = options.ignoreCase !== false; // default to true

    function getSortableValue(element, ignoreCase = true) {
      if (element.type === 'Literal' && typeof element.value === 'string') {
        return ignoreCase ? element.value.toLowerCase() : element.value;
      }
      // For non-string literals (RegExp, etc.), use the raw source text for comparison
      return element.raw || '';
    }

    function sortStringLiterals(elements, ignoreCase = true) {
      return [...elements].sort((a, b) => {
        const aValue = getSortableValue(a, ignoreCase);
        const bValue = getSortableValue(b, ignoreCase);
        return aValue.localeCompare(bValue);
      });
    }

    function isArrayUnsorted(elements, ignoreCase = true) {
      if (elements.length <= 1) return false;

      for (let i = 1; i < elements.length; i++) {
        const prev = elements[i - 1];
        const curr = elements[i];

        const prevValue = getSortableValue(prev, ignoreCase);
        const currValue = getSortableValue(curr, ignoreCase);

        if (prevValue.localeCompare(currValue) > 0) {
          return true;
        }
      }
      return false;
    }

    return {
      Property(node) {
        // Only process specified array properties
        if (!node.key || node.key.type !== 'Identifier') return;
        if (!arrayProperties.includes(node.key.name)) return;

        // Only process array expressions
        if (!node.value || node.value.type !== 'ArrayExpression') return;

        const elements = node.value.elements;
        if (!elements || elements.length <= 1) return;

        // Check if array is unsorted
        if (isArrayUnsorted(elements, ignoreCase)) {
          context.report({
            node: node.value,
            message: `Array property '${node.key.name}' should be sorted alphabetically`,
            fix(fixer) {
              const sortedElements = sortStringLiterals(elements, ignoreCase);
              const sourceCode = context.getSourceCode();

              // Get the original text for each element to preserve formatting
              const sortedTexts = sortedElements.map(element =>
                sourceCode.getText(element)
              );

              // Find the range from first to last element
              const firstElement = elements[0];
              const lastElement = elements[elements.length - 1];
              const start = firstElement.range[0];
              const end = lastElement.range[1];

              // Create the replacement text with proper formatting
              const replacement = sortedTexts.join(', ');

              return fixer.replaceTextRange([start, end], replacement);
            },
          });
        }
      },
    };
  },
};
