import type { Meta, StoryObj } from '@storybook/angular';

// Default export for CSF compliance
export default {
  title: 'Utilities/Permutation Utils',
  includeStories: ['Docs'],
} as Meta;

/**
 * Utility types for permutation generation
 */
type PermutationValue = string | number | boolean | undefined | null;
type PermutationRecord = Record<string, PermutationValue>;

/**
 * Configuration for permutation generation
 */
export interface PermutationConfig<T = unknown> {
  /** The Storybook meta object */
  meta: Meta<T>;
  /** Properties to exclude from permutation generation */
  excludeProps?: string[];
  /** Custom text generator for each permutation */
  textGenerator?: (permutation: PermutationRecord) => string;
  /** Custom CSS grid configuration */
  gridConfig?: {
    minItemWidth?: string;
    gap?: string;
    maxHeight?: string;
  };
  /** Story parameters to merge */
  storyParameters?: Record<string, unknown>;
}

/**
 * Extract permutation values from argTypes configuration
 */
function extractPermutationValues(
  argTypes: Record<string, unknown>,
  excludeProps: string[] = []
): Record<string, PermutationValue[]> {
  const permutationValues: Record<string, PermutationValue[]> = {};
  Object.entries(argTypes).forEach(([propName, config]) => {
    if (excludeProps.includes(propName)) {
      return;
    }

    // Type guard for config object
    if (!config || typeof config !== 'object') {
      return;
    }

    const argConfig = config as Record<string, unknown>; // Skip event handlers and functions
    if (
      argConfig['action'] ||
      typeof argConfig['defaultValue'] === 'function'
    ) {
      return;
    }

    // Extract values from options or mapping
    if (argConfig['options'] && Array.isArray(argConfig['options'])) {
      permutationValues[propName] = argConfig['options'] as PermutationValue[];
    } else if (
      argConfig['control'] &&
      typeof argConfig['control'] === 'object'
    ) {
      const control = argConfig['control'] as Record<string, unknown>;
      if (control['type'] === 'boolean') {
        permutationValues[propName] = [false, true];
      }
    } else if (
      argConfig['mapping'] &&
      typeof argConfig['mapping'] === 'object'
    ) {
      const mapping = argConfig['mapping'] as Record<string, unknown>;
      permutationValues[propName] = Object.keys(mapping).map(key =>
        key === 'undefined' ? undefined : mapping[key]
      ) as PermutationValue[];
    }
  });

  return permutationValues;
}

/**
 * Generate all permutations from the extracted values
 */
function generatePermutations(
  values: Record<string, PermutationValue[]>
): PermutationRecord[] {
  const keys = Object.keys(values);
  if (keys.length === 0) return [{}];

  const result: PermutationRecord[] = [];

  function generateRecursive(
    currentPermutation: PermutationRecord,
    keyIndex: number
  ) {
    if (keyIndex === keys.length) {
      result.push({ ...currentPermutation });
      return;
    }

    const currentKey = keys[keyIndex];
    const currentValues = values[currentKey];

    for (const value of currentValues) {
      currentPermutation[currentKey] = value;
      generateRecursive(currentPermutation, keyIndex + 1);
    }
  }

  generateRecursive({}, 0);
  return result;
}

/**
 * Default text generator that creates a descriptive name for each permutation
 */
function defaultTextGenerator(permutation: PermutationRecord): string {
  return (
    Object.entries(permutation)
      .filter(([key, value]) => value !== undefined && key !== 'text')
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? key : `no-${key}`;
        }
        return `${value}`;
      })
      .join('-') || 'default'
  );
}

/**
 * Creates a permutation story from a meta configuration
 */
export function createPermutationStory<T = unknown>(
  config: PermutationConfig<T>
): StoryObj<T> {
  const {
    meta,
    excludeProps = ['text'], // Generic default - exclude text prop which is often used for display
    textGenerator = defaultTextGenerator,
    gridConfig = {},
    storyParameters = {},
  } = config;

  const {
    minItemWidth = '200px',
    gap = '0.5rem',
    maxHeight = '80vh',
  } = gridConfig;

  return {
    render: args => {
      // Extract permutation values from meta.argTypes
      const permutationValues = extractPermutationValues(
        meta.argTypes || {},
        excludeProps
      ); // Generate all permutations
      const permutations = generatePermutations(permutationValues);

      // If no permutations are generated, return a simple message
      if (permutations.length === 0) {
        return {
          template: `
            <div style="padding: 20px; border: 2px dashed #ccc; text-align: center;">
              <p>No permutations found. Check that argTypes has valid options, controls, or mappings.</p>
            </div>
          `,
        };
      }

      // Helper functions for template
      const getPermutationText = (perm: PermutationRecord) =>
        textGenerator(perm); // Create generic event handlers for any events not in excludeProps
      const createEventHandler = (eventName: string) => {
        return () => {
          console.log(`${eventName} event triggered`);
          const argsWithEvents = args as Record<string, unknown>;
          return argsWithEvents[eventName] &&
            typeof argsWithEvents[eventName] === 'function'
            ? (argsWithEvents[eventName] as () => unknown)()
            : undefined;
        };
      };

      // Get all event props from argTypes (those with action: true)
      const eventProps = Object.entries(meta.argTypes || {})
        .filter(([propName, config]) => {
          if (excludeProps.includes(propName)) return false;
          const argConfig = config as Record<string, unknown>;
          return argConfig && argConfig['action'];
        })
        .map(([propName]) => propName); // Get component selector from meta
      let componentSelector = 'unknown-component'; // Generic fallback

      if (meta.component && typeof meta.component === 'function') {
        // Try to get selector from component decorator metadata
        const componentMetadata = (meta.component as Record<string, unknown>)[
          'ɵcmp'
        ] as Record<string, unknown> | undefined;
        if (
          componentMetadata &&
          componentMetadata['selectors'] &&
          Array.isArray(componentMetadata['selectors'])
        ) {
          const selectors = componentMetadata['selectors'] as unknown[][];
          if (
            selectors[0] &&
            Array.isArray(selectors[0]) &&
            typeof selectors[0][0] === 'string'
          ) {
            componentSelector = selectors[0][0];
          }
        }
      }

      // Fallback: extract from meta.title if selector wasn't found from metadata
      if (componentSelector === 'unknown-component' && meta.title) {
        const componentName = meta.title.split('/').pop() || 'component';
        // Convert "ColorChip" to "color-chip", "MyButton" to "my-button", etc.
        const kebabCase = componentName
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .toLowerCase();
        componentSelector = `lib-${kebabCase}`;
      }

      // Generate template with all permutations
      const permutationElements = permutations
        .map(perm => {
          const propBindings = Object.entries(perm)
            .map(([key, value]) => {
              if (value === undefined) return '';
              if (typeof value === 'string') return `[${key}]="'${value}'"`;
              if (typeof value === 'boolean')
                return value ? `[${key}]="true"` : `[${key}]="false"`;
              return `[${key}]="${JSON.stringify(value)}"`;
            })
            .filter(Boolean)
            .join(' ');
          const textBinding = `[text]="'${getPermutationText(perm)}'"`;

          // Generate event bindings for all detected event props
          const eventBindings = eventProps
            .map(eventProp => `(${eventProp})="${eventProp}Handler()"`)
            .join(' ');

          return `<${componentSelector} ${textBinding} ${propBindings} ${eventBindings}></${componentSelector}>`;
        })
        .join('\n          ');
      console.log('Permutation Debug:', {
        permutations: permutations.length,
        componentSelector,
        metaTitle: meta.title,
        sample: permutations[0],
        argTypes: Object.keys(meta.argTypes || {}),
        extractedValues: Object.keys(permutationValues),
        eventProps,
        elements: permutationElements.substring(0, 300) + '...',
      }); // Create event handler props for the template
      const eventHandlerProps: Record<string, () => void> = {};
      eventProps.forEach(eventProp => {
        eventHandlerProps[`${eventProp}Handler`] =
          createEventHandler(eventProp);
      });

      return {
        props: {
          ...args,
          ...eventHandlerProps,
        },
        template: `
          <div style="display: grid; gap: ${gap}; grid-template-columns: repeat(auto-fill, minmax(${minItemWidth}, 1fr)); max-height: ${maxHeight}; overflow-y: auto;">
            ${permutationElements}
          </div>
        `,
        moduleMetadata: {
          imports: [meta.component],
        },
      };
    },
    parameters: {
      docs: {
        description: {
          story:
            'All possible permutations of the component properties displayed in a responsive grid.',
        },
      },
      ...storyParameters,
    },
  };
}

// Export a self-test story to satisfy CSF requirements
export const Docs: StoryObj = {
  render: () => ({
    template: `
      <div style="padding: 20px; font-family: sans-serif;">        <h2>Permutation Utils</h2>
        <p>This utility provides a reusable function for creating permutation stories:</p>
        <ul>
          <li><code>createPermutationStory()</code> - Generate all permutations of component properties</li>
        </ul>
        <p><em>This story exists to satisfy Storybook's CSF requirements for .stories.ts files.</em></p>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Self-test story for the permutation utility functions. This ensures the .stories.ts file has a valid CSF structure.',
      },
    },
  },
};

// Example story showing how to use createPermutationStory
export const CreatePermutationStory: StoryObj = {
  render: () => ({
    template: `
      <div style="padding: 20px; font-family: sans-serif;">
        <h3>How to use createPermutationStory()</h3>
        <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto;"><code>import { createPermutationStory } from './permutation-utils.stories';

// Simple usage with minimal config
export const AllPermutations: Story = createPermutationStory({
  meta: yourMetaObject,
});

// With custom excludeProps
export const AllPermutations: Story = createPermutationStory({
  meta: yourMetaObject,
  excludeProps: ['text', 'clickEvent'], // Exclude props you don't want in permutations
});

// Full customization
export const AllPermutations: Story = createPermutationStory({
  meta: yourMetaObject,
  excludeProps: ['text', 'clickEvent'],
  textGenerator: (perm) => 'Custom-' + Object.values(perm).join('-'),
  gridConfig: {
    minItemWidth: '300px',
    gap: '1rem',
    maxHeight: '90vh',
  },
  storyParameters: {
    docs: { description: { story: 'Custom description' } },
  },
});</code></pre>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Example of how to use the createPermutationStory function with different levels of customization.',
      },
    },
  },
};
