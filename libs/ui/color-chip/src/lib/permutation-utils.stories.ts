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
  /** Property to split into separate output columns instead of combinatorial rows */
  splitProperty?: string;
  /** Properties that should NOT include undefined in their permutations */
  excludeUndefined?: string[];
  /** Properties that should ALWAYS include undefined in their permutations */
  includeUndefined?: string[];
  /** Custom order for combinatorial columns (properties not listed will appear after in default order) */
  columnOrder?: string[];
  /** Per-property text generators with mode and content configuration */
  textGenerators?: Record<
    string,
    {
      mode: 'complex' | 'constant';
      generator?: (permutation: PermutationRecord) => string;
      constantText?: string;
    }
  >;
  /** Custom display configuration */
  displayConfig?: {
    gap?: string;
    maxHeight?: string;
    hideTable?: boolean;
    alignment?:
      | 'top-left'
      | 'top-center'
      | 'top-right'
      | 'center-left'
      | 'center-center'
      | 'center-right'
      | 'bottom-left'
      | 'bottom-center'
      | 'bottom-right';
  };
  /** Story parameters to merge */
  storyParameters?: Record<string, unknown>;
}

/**
 * Extract permutation values from argTypes configuration
 */
function extractPermutationValues(
  argTypes: Record<string, unknown>,
  excludeProps: string[] = [],
  excludeUndefined: string[] = [],
  includeUndefined: string[] = []
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

    const argConfig = config as Record<string, unknown>;

    // Skip event handlers and functions
    if (
      argConfig['action'] ||
      typeof argConfig['defaultValue'] === 'function'
    ) {
      return;
    }

    // Also skip EventEmitter outputs (check table.type.summary for EventEmitter)
    const tableType = argConfig['table'] as Record<string, unknown> | undefined;
    if (tableType?.['type'] && typeof tableType['type'] === 'object') {
      const typeInfo = tableType['type'] as Record<string, unknown>;
      if (
        typeof typeInfo['summary'] === 'string' &&
        typeInfo['summary'].includes('EventEmitter')
      ) {
        return;
      }
    }

    // Extract values from options or mapping
    if (argConfig['options'] && Array.isArray(argConfig['options'])) {
      let values = argConfig['options'] as PermutationValue[];

      // Handle undefined inclusion/exclusion for options
      if (excludeUndefined.includes(propName)) {
        values = values.filter(v => v !== undefined);
      } else if (
        includeUndefined.includes(propName) &&
        !values.includes(undefined)
      ) {
        values = [undefined, ...values];
      }

      permutationValues[propName] = values;
    } else if (
      argConfig['control'] &&
      typeof argConfig['control'] === 'object'
    ) {
      const control = argConfig['control'] as Record<string, unknown>;
      if (control['type'] === 'boolean') {
        let values: PermutationValue[] = [undefined, false, true];

        // Handle undefined inclusion/exclusion for boolean controls
        if (excludeUndefined.includes(propName)) {
          values = [false, true];
        } else if (!includeUndefined.includes(propName)) {
          // Keep default behavior (include undefined)
        }

        permutationValues[propName] = values;
      }
    } else if (argConfig['control'] === 'boolean') {
      // Handle shorthand boolean control format
      let values: PermutationValue[] = [undefined, false, true];

      // Handle undefined inclusion/exclusion for shorthand boolean controls
      if (excludeUndefined.includes(propName)) {
        values = [false, true];
      } else if (!includeUndefined.includes(propName)) {
        // Keep default behavior (include undefined)
      }

      permutationValues[propName] = values;
    } else if (
      argConfig['mapping'] &&
      typeof argConfig['mapping'] === 'object'
    ) {
      const mapping = argConfig['mapping'] as Record<string, unknown>;
      let values = Object.keys(mapping).map(key =>
        key === 'undefined' ? undefined : mapping[key]
      ) as PermutationValue[];

      // Handle undefined inclusion/exclusion for mapping
      if (excludeUndefined.includes(propName)) {
        values = values.filter(v => v !== undefined);
      } else if (
        includeUndefined.includes(propName) &&
        !values.includes(undefined)
      ) {
        values = [undefined, ...values];
      }

      permutationValues[propName] = values;
    }
  });

  return permutationValues;
}

/**
 * Generate all permutations from the extracted values
 */
function generatePermutations(
  values: Record<string, PermutationValue[]>,
  keyOrder?: string[]
): PermutationRecord[] {
  let keys = Object.keys(values);

  // Apply custom key order if provided
  if (keyOrder && keyOrder.length > 0) {
    const orderedKeys = [];

    // First, add keys in the specified order
    for (const key of keyOrder) {
      if (keys.includes(key)) {
        orderedKeys.push(key);
      }
    }

    // Then, add remaining keys not specified in keyOrder
    for (const key of keys) {
      if (!orderedKeys.includes(key)) {
        orderedKeys.push(key);
      }
    }

    keys = orderedKeys;
  }

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
function createDefaultTextGenerator<T = unknown>(meta: Meta<T>) {
  return (permutation: PermutationRecord): string => {
    // Generate text based on permutation values (complex mode)
    const generatedText = Object.entries(permutation)
      .filter(([key, value]) => value !== undefined && key !== 'text')
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? key : `no-${key}`;
        }
        return `${value}`;
      })
      .join('-');

    // If we have generated text, use it; otherwise fall back to meta.args
    if (generatedText) {
      return generatedText;
    }

    // Fall back to default args from meta if available
    const defaultArgs = meta.args as Record<string, unknown> | undefined;
    if (
      defaultArgs &&
      defaultArgs['text'] &&
      typeof defaultArgs['text'] === 'string'
    ) {
      return defaultArgs['text'] as string;
    }

    return 'default';
  };
}

/**
 * Creates a permutation story from a meta configuration
 */
export function createPermutationStory<T = unknown>(
  config: PermutationConfig<T>
): StoryObj<T> {
  const {
    meta,
    excludeProps = [], // No default exclusions - we'll automatically exclude text props
    splitProperty,
    excludeUndefined = [],
    includeUndefined = [],
    columnOrder = [],
    textGenerators = {},
    displayConfig = {},
    storyParameters = {},
  } = config;

  const {
    maxHeight = '80vh',
    hideTable = false,
    alignment = 'center-center',
  } = displayConfig;

  // First, identify text properties (those with text control only, not select fields)
  const textProps = Object.keys(meta.argTypes || {}).filter(prop => {
    const argTypes = meta.argTypes as
      | Record<string, Record<string, unknown>>
      | undefined;
    const argConfig = argTypes?.[prop];

    if (!argConfig) return false;

    // Check if it's specifically a text control (not select, radio, etc.)
    const control = argConfig['control'];

    return (
      control === 'text' ||
      (typeof control === 'object' &&
        (control as Record<string, unknown>)['type'] === 'text')
    );
  });

  // Automatically exclude text properties from permutations (can be overridden by config)
  const finalExcludeProps = [...new Set([...textProps, ...excludeProps])];

  // Extract available properties for controls (after auto-exclusion)
  const availableProps = Object.keys(meta.argTypes || {}).filter(prop => {
    const argTypes = meta.argTypes as
      | Record<string, Record<string, unknown>>
      | undefined;
    const argConfig = argTypes?.[prop];

    if (!argConfig) return false;

    return (
      !finalExcludeProps.includes(prop) &&
      !argConfig['action'] &&
      !(
        typeof argConfig['table'] === 'object' &&
        argConfig['table'] &&
        typeof (argConfig['table'] as Record<string, unknown>)['type'] ===
          'object' &&
        (argConfig['table'] as Record<string, unknown>)['type'] &&
        typeof (
          (argConfig['table'] as Record<string, unknown>)['type'] as Record<
            string,
            unknown
          >
        )['summary'] === 'string' &&
        (
          (
            (argConfig['table'] as Record<string, unknown>)['type'] as Record<
              string,
              unknown
            >
          )['summary'] as string
        )?.includes('EventEmitter')
      )
    );
  });

  // Create argTypes that hide original component controls and add permutation controls
  const permutationArgTypes: Record<string, unknown> = {};

  // Hide all original component controls
  Object.keys(meta.argTypes || {}).forEach(prop => {
    permutationArgTypes[prop] = {
      table: { disable: true },
      control: { disable: true },
    };
  });

  // Add permutation table configuration controls
  permutationArgTypes['permutationSplitProperty'] = {
    name: 'Split Property',
    control: 'select',
    options: [undefined, ...availableProps],
    description:
      'Property to split into separate output columns instead of combinatorial rows',
    table: {
      category: 'Permutation Table',
      type: { summary: 'string | undefined' },
    },
  };
  permutationArgTypes['permutationMaxHeight'] = {
    name: 'Max Height',
    control: 'text',
    description: 'Maximum height of the table container',
    table: {
      category: 'Permutation Table',
      type: { summary: 'string' },
      defaultValue: { summary: '80vh' },
    },
  };
  permutationArgTypes['permutationShowDebugInfo'] = {
    name: 'Show Debug Info',
    control: 'boolean',
    description: 'Show debug information in console',
    table: {
      category: 'Permutation Table',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'true' },
    },
  };
  permutationArgTypes['permutationExcludeProps'] = {
    name: 'Exclude Props',
    control: 'check',
    options: availableProps,
    description: 'Properties to exclude from permutation generation',
    table: {
      category: 'Permutation Table',
      type: { summary: 'string[]' },
    },
  };
  permutationArgTypes['permutationExcludeUndefined'] = {
    name: 'Exclude Undefined',
    control: 'check',
    options: availableProps,
    description:
      'Properties that should NOT include undefined in their permutations',
    table: {
      category: 'Permutation Table',
      type: { summary: 'string[]' },
    },
  };
  permutationArgTypes['permutationIncludeUndefined'] = {
    name: 'Include Undefined',
    control: 'check',
    options: availableProps,
    description:
      'Properties that should ALWAYS include undefined in their permutations',
    table: {
      category: 'Permutation Table',
      type: { summary: 'string[]' },
    },
  };
  permutationArgTypes['permutationColumnOrder'] = {
    name: 'Column Order',
    control: 'text',
    description:
      'Custom order for combinatorial columns (comma-separated, e.g., "spacing,icon,showCloseButton"). Available props: ' +
      availableProps.join(', '),
    table: {
      category: 'Permutation Table',
      type: { summary: 'string[]' },
    },
  };
  permutationArgTypes['permutationHideTable'] = {
    name: 'Hide Table',
    control: 'boolean',
    description:
      'Hide the table structure and display only the output components',
    table: {
      category: 'Permutation Table',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  };
  permutationArgTypes['permutationAlignment'] = {
    name: 'Component Alignment',
    control: 'select',
    options: [
      'top-left',
      'top-center',
      'top-right',
      'center-left',
      'center-center',
      'center-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ],
    description:
      'Alignment of components within their cells (vertical-horizontal)',
    table: {
      category: 'Permutation Table',
      type: { summary: 'string' },
      defaultValue: { summary: 'center-center' },
    },
  };

  // Add text generation controls for each text property
  textProps.forEach(textProp => {
    permutationArgTypes[`permutation${textProp}Mode`] = {
      name: `${textProp} Mode`,
      control: 'select',
      options: ['complex', 'constant'],
      description: `Text generation mode for ${textProp}: complex (based on permutation values) or constant (fixed text)`,
      table: {
        category: 'Text Generation',
        type: { summary: 'string' },
        defaultValue: { summary: 'complex' },
      },
    };

    permutationArgTypes[`permutation${textProp}ConstantText`] = {
      name: `${textProp} Constant Text`,
      control: 'text',
      description: `Fixed text to use for ${textProp} when mode is 'constant'`,
      table: {
        category: 'Text Generation',
        type: { summary: 'string' },
        defaultValue: { summary: 'Example Text' },
      },
    };
  });

  return {
    argTypes: permutationArgTypes,
    args: {
      permutationSplitProperty: splitProperty,
      permutationMaxHeight: maxHeight,
      permutationShowDebugInfo: true,
      permutationExcludeProps: finalExcludeProps,
      permutationExcludeUndefined: excludeUndefined,
      permutationIncludeUndefined: includeUndefined,
      permutationColumnOrder: columnOrder.join(', '),
      permutationHideTable: hideTable,
      permutationAlignment: alignment,
      // Add default values for text generation controls
      ...textProps.reduce((acc, textProp) => {
        const textConfig = textGenerators[textProp];
        const defaultArgs = meta.args as Record<string, unknown> | undefined;
        const defaultConstantText =
          textConfig?.constantText ||
          (defaultArgs &&
          defaultArgs[textProp] &&
          typeof defaultArgs[textProp] === 'string'
            ? (defaultArgs[textProp] as string)
            : 'Example Text');

        acc[`permutation${textProp}Mode`] = textConfig?.mode || 'complex';
        acc[`permutation${textProp}ConstantText`] = defaultConstantText;
        return acc;
      }, {} as Record<string, unknown>),
    },
    render: (args: Record<string, unknown>) => {
      // Use args for dynamic configuration
      const dynamicSplitProperty =
        (args['permutationSplitProperty'] as string) || splitProperty;
      const dynamicMaxHeight =
        (args['permutationMaxHeight'] as string) || maxHeight;
      const showDebugInfo =
        (args['permutationShowDebugInfo'] as boolean) !== false;
      const dynamicExcludeProps =
        (args['permutationExcludeProps'] as string[]) || finalExcludeProps;
      const dynamicExcludeUndefined =
        (args['permutationExcludeUndefined'] as string[]) || excludeUndefined;
      const dynamicIncludeUndefined =
        (args['permutationIncludeUndefined'] as string[]) || includeUndefined;
      const dynamicColumnOrder = (() => {
        const orderText = args['permutationColumnOrder'] as string;
        if (typeof orderText === 'string' && orderText.trim()) {
          return orderText
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);
        }
        return columnOrder;
      })();
      const dynamicHideTable =
        args['permutationHideTable'] !== undefined
          ? (args['permutationHideTable'] as boolean)
          : hideTable;
      const dynamicAlignment =
        (args['permutationAlignment'] as string) || alignment;

      // Extract permutation values from meta.argTypes using dynamic configuration
      const permutationValues = extractPermutationValues(
        meta.argTypes || {},
        dynamicExcludeProps,
        dynamicExcludeUndefined,
        dynamicIncludeUndefined
      );

      // Handle split property
      let splitPropertyValues: PermutationValue[] = [];
      if (dynamicSplitProperty && permutationValues[dynamicSplitProperty]) {
        splitPropertyValues = permutationValues[dynamicSplitProperty];
        // Remove split property from combinatorial permutations
        delete permutationValues[dynamicSplitProperty];
      }

      // Generate all permutations with dynamic column order
      const permutations = generatePermutations(
        permutationValues,
        dynamicColumnOrder
      );

      // If no permutations are generated, return a simple message
      if (permutations.length === 0 && splitPropertyValues.length === 0) {
        return {
          template: `
            <div style="padding: 20px; border: 2px dashed #ccc; text-align: center;">
              <p>No permutations found. Check that argTypes has valid options, controls, or mappings.</p>
            </div>
          `,
        };
      }

      // Helper functions for template

      // Extract dynamic text generation configuration from args
      const dynamicTextGenerators: Record<
        string,
        { mode: string; constantText: string }
      > = {};
      textProps.forEach(textProp => {
        const mode =
          (args[`permutation${textProp}Mode`] as string) ||
          textGenerators[textProp]?.mode ||
          'complex';
        const constantText =
          (args[`permutation${textProp}ConstantText`] as string) ||
          textGenerators[textProp]?.constantText ||
          'Example Text';
        dynamicTextGenerators[textProp] = { mode, constantText };
      });

      const getPermutationText = (
        perm: PermutationRecord,
        propertyName = 'text'
      ) => {
        const textConfig = dynamicTextGenerators[propertyName];

        if (textConfig?.mode === 'constant') {
          return textConfig.constantText;
        }

        // Use custom generator if provided for this property
        const customGenerator = textGenerators[propertyName]?.generator;
        if (customGenerator) {
          return customGenerator(perm);
        }

        // Fall back to default generator
        return createDefaultTextGenerator(meta)(perm);
      };

      // Convert alignment string to CSS properties
      const getAlignmentStyles = (alignment: string) => {
        const [vertical, horizontal] = alignment.split('-');
        const alignItems =
          vertical === 'top'
            ? 'flex-start'
            : vertical === 'bottom'
            ? 'flex-end'
            : 'center';
        const justifyContent =
          horizontal === 'left'
            ? 'flex-start'
            : horizontal === 'right'
            ? 'flex-end'
            : 'center';
        return { alignItems, justifyContent };
      };

      // Create generic event handlers for any events not in excludeProps
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
          if (dynamicExcludeProps.includes(propName)) return false;
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

      // Get parameter names for table headers (excluding split property)
      const allParameterNames = Object.keys(permutationValues);

      // Apply custom column order
      const orderedParameterNames = [];

      // First, add parameters in the specified order
      for (const paramName of dynamicColumnOrder) {
        if (allParameterNames.includes(paramName)) {
          orderedParameterNames.push(paramName);
        }
      }

      // Then, add remaining parameters not specified in columnOrder
      for (const paramName of allParameterNames) {
        if (!orderedParameterNames.includes(paramName)) {
          orderedParameterNames.push(paramName);
        }
      }

      const parameterNames = orderedParameterNames;

      // Generate table headers
      const parameterHeaders = parameterNames
        .map((name, index) => {
          const isLastColumn = index === parameterNames.length - 1;
          const borderStyle = isLastColumn
            ? '2px solid #6c757d'
            : '1px solid #dee2e6';
          return `<th style="padding: 8px 6px; border-right: ${borderStyle}; background: #f8f9fa; font-weight: 600; font-size: 0.875rem; color: #495057; white-space: nowrap;">${name}</th>`;
        })
        .join('');

      // Generate split property headers or single component header
      const componentHeaders =
        dynamicSplitProperty && splitPropertyValues.length > 0
          ? splitPropertyValues
              .map(value => {
                const displayValue =
                  value === undefined ? 'undefined' : String(value);
                const chipStyle =
                  value === undefined
                    ? 'background: #f8f9fa; color: #6c757d; border: 1px solid #dee2e6;'
                    : 'background: #e3f2fd; color: #1565c0; border: 1px solid #bbdefb;';
                return `<th style="padding: 8px 6px; background: #e9ecef; font-weight: 500; font-size: 0.875rem; color: #495057; text-align: center;">
                  <code style="font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace; font-size: 0.75rem; padding: 4px 6px; border-radius: 4px; ${chipStyle}">${displayValue}</code>
                </th>`;
              })
              .join('')
          : `<th style="padding: 8px 6px; background: #e9ecef; font-weight: 500; font-size: 0.875rem; color: #495057; text-align: center;">Component</th>`;

      // Generate split property name header if splitProperty is defined
      let tableHeaders = '';
      if (dynamicSplitProperty && splitPropertyValues.length > 0) {
        tableHeaders = `
          <tr>
            <th colspan="${parameterNames.length}" style="padding: 8px; border-right: 2px solid #6c757d; background: #f8f9fa; font-weight: 600; font-size: 0.75rem; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px;">Combinatorial Properties</th>
            <th colspan="${splitPropertyValues.length}" style="padding: 8px; background: #e9ecef; font-weight: 600; font-size: 0.75rem; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px; text-align: center;">${dynamicSplitProperty}</th>
          </tr>
          <tr>${parameterHeaders}${componentHeaders}</tr>
        `;
      } else {
        tableHeaders = `<tr>${parameterHeaders}${componentHeaders}</tr>`;
      }

      // Generate table rows with permutations
      const tableRows = permutations
        .map(perm => {
          // Create cells for each parameter value
          const parameterCells = parameterNames
            .map((paramName, index) => {
              const value = perm[paramName];
              const displayValue =
                value === undefined ? 'undefined' : String(value);
              const chipStyle =
                value === undefined
                  ? 'background: #f8f9fa; color: #6c757d; border: 1px solid #dee2e6;'
                  : 'background: #e3f2fd; color: #1565c0; border: 1px solid #bbdefb;';
              const isLastColumn = index === parameterNames.length - 1;
              const borderStyle = isLastColumn
                ? '2px solid #6c757d'
                : '1px solid #f1f3f4';
              return `<td style="padding: 8px 6px; border-right: ${borderStyle}; text-align: right; white-space: nowrap;">
                <code style="font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace; font-size: 0.75rem; padding: 4px 6px; border-radius: 4px; ${chipStyle}">${displayValue}</code>
              </td>`;
            })
            .join('');

          // Generate component cells
          const componentCells =
            dynamicSplitProperty && splitPropertyValues.length > 0
              ? splitPropertyValues
                  .map(splitValue => {
                    // Create component bindings including the split property value
                    const fullPermutation = { ...perm };
                    if (splitValue !== undefined) {
                      fullPermutation[dynamicSplitProperty] = splitValue;
                    }

                    const propBindings = Object.entries(fullPermutation)
                      .map(([key, value]) => {
                        if (value === undefined) return '';
                        if (typeof value === 'string')
                          return `[${key}]="'${value}'"`;
                        if (typeof value === 'boolean')
                          return value ? `[${key}]="true"` : `[${key}]="false"`;
                        return `[${key}]="${JSON.stringify(value)}"`;
                      })
                      .filter(Boolean)
                      .join(' ');

                    // Generate text bindings for all text properties
                    const textBindings = textProps
                      .map(
                        textProp =>
                          `[${textProp}]="'${getPermutationText(
                            fullPermutation,
                            textProp
                          )}'"`
                      )
                      .join(' ');

                    // Generate event bindings for all detected event props
                    const eventBindings = eventProps
                      .map(
                        eventProp => `(${eventProp})="${eventProp}Handler()"`
                      )
                      .join(' ');

                    const componentElement = `<${componentSelector} ${textBindings} ${propBindings} ${eventBindings}></${componentSelector}>`;
                    const alignmentStyles =
                      getAlignmentStyles(dynamicAlignment);
                    return `<td style="padding: 12px 8px; border-left: ${
                      splitPropertyValues.indexOf(splitValue) === 0
                        ? '2px solid #6c757d'
                        : '1px solid #f1f3f4'
                    }; background: #fafbfc;"><div style="display: flex; align-items: ${
                      alignmentStyles.alignItems
                    }; justify-content: ${
                      alignmentStyles.justifyContent
                    }; min-height: 40px;">${componentElement}</div></td>`;
                  })
                  .join('')
              : (() => {
                  // Single component column (no split property)
                  const propBindings = Object.entries(perm)
                    .map(([key, value]) => {
                      if (value === undefined) return '';
                      if (typeof value === 'string')
                        return `[${key}]="'${value}'"`;
                      if (typeof value === 'boolean')
                        return value ? `[${key}]="true"` : `[${key}]="false"`;
                      return `[${key}]="${JSON.stringify(value)}"`;
                    })
                    .filter(Boolean)
                    .join(' ');

                  // Generate text bindings for all text properties
                  const textBindings = textProps
                    .map(
                      textProp =>
                        `[${textProp}]="'${getPermutationText(
                          perm,
                          textProp
                        )}'"`
                    )
                    .join(' ');

                  // Generate event bindings for all detected event props
                  const eventBindings = eventProps
                    .map(eventProp => `(${eventProp})="${eventProp}Handler()"`)
                    .join(' ');

                  const componentElement = `<${componentSelector} ${textBindings} ${propBindings} ${eventBindings}></${componentSelector}>`;
                  const alignmentStyles = getAlignmentStyles(dynamicAlignment);
                  return `<td style="padding: 12px 8px; border-left: 2px solid #6c757d; background: #fafbfc;"><div style="display: flex; align-items: ${alignmentStyles.alignItems}; justify-content: ${alignmentStyles.justifyContent}; min-height: 40px;">${componentElement}</div></td>`;
                })();

          return `<tr>${parameterCells}${componentCells}</tr>`;
        })
        .join('\n          ');

      if (showDebugInfo) {
        console.log('Permutation Debug:', {
          permutations: permutations.length,
          componentSelector,
          metaTitle: meta.title,
          sample: permutations[0],
          argTypes: Object.keys(meta.argTypes || {}),
          extractedValues: Object.keys(permutationValues),
          splitProperty: dynamicSplitProperty,
          splitPropertyValues,
          eventProps,
          parameterNames,
        });
      } // Create event handler props for the template
      const eventHandlerProps: Record<string, () => void> = {};
      eventProps.forEach(eventProp => {
        eventHandlerProps[`${eventProp}Handler`] =
          createEventHandler(eventProp);
      });

      // If hideTable is true, render components in organized rows/columns but without headers and combinatorial columns
      if (dynamicHideTable) {
        // Calculate the number of columns for CSS Grid (matches table structure exactly)
        const columnCount =
          dynamicSplitProperty && splitPropertyValues.length > 0
            ? splitPropertyValues.length
            : 1;

        // Generate grid rows that mirror the table structure
        const gridRows = permutations.map(perm => {
          if (dynamicSplitProperty && splitPropertyValues.length > 0) {
            // Multiple components per permutation (split property) - one row with multiple columns
            const rowComponents = splitPropertyValues.map(splitValue => {
              const fullPermutation = { ...perm };
              if (splitValue !== undefined) {
                fullPermutation[dynamicSplitProperty] = splitValue;
              }

              const propBindings = Object.entries(fullPermutation)
                .map(([key, value]) => {
                  if (value === undefined) return '';
                  if (typeof value === 'string') return `[${key}]="'${value}'"`;
                  if (typeof value === 'boolean')
                    return value ? `[${key}]="true"` : `[${key}]="false"`;
                  return `[${key}]="${JSON.stringify(value)}"`;
                })
                .filter(Boolean)
                .join(' ');

              // Generate text bindings for all text properties
              const textBindings = textProps
                .map(
                  textProp =>
                    `[${textProp}]="'${getPermutationText(
                      fullPermutation,
                      textProp
                    )}'"`
                )
                .join(' ');

              const eventBindings = eventProps
                .map(eventProp => `(${eventProp})="${eventProp}Handler()"`)
                .join(' ');

              const componentElement = `<${componentSelector} ${textBindings} ${propBindings} ${eventBindings}></${componentSelector}>`;
              const alignmentStyles = getAlignmentStyles(dynamicAlignment);
              return `<div style="padding: 8px; display: flex; align-items: ${alignmentStyles.alignItems}; justify-content: ${alignmentStyles.justifyContent};">${componentElement}</div>`;
            });

            return rowComponents.join('');
          } else {
            // Single component per permutation - one row with one column
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

            // Generate text bindings for all text properties
            const textBindings = textProps
              .map(
                textProp =>
                  `[${textProp}]="'${getPermutationText(perm, textProp)}'"`
              )
              .join(' ');

            const eventBindings = eventProps
              .map(eventProp => `(${eventProp})="${eventProp}Handler()"`)
              .join(' ');

            const componentElement = `<${componentSelector} ${textBindings} ${propBindings} ${eventBindings}></${componentSelector}>`;
            const alignmentStyles = getAlignmentStyles(dynamicAlignment);
            return `<div style="padding: 8px; display: flex; align-items: ${alignmentStyles.alignItems}; justify-content: ${alignmentStyles.justifyContent};">${componentElement}</div>`;
          }
        });

        return {
          props: {
            ...args,
            ...eventHandlerProps,
          },
          template: `
            <div style="max-height: ${dynamicMaxHeight}; overflow: auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <div style="display: grid; grid-template-columns: repeat(${columnCount}, max-content); gap: 8px; justify-content: start; align-content: start;">
                ${gridRows.join('\n                ')}
              </div>
            </div>
          `,
          moduleMetadata: {
            imports: [meta.component],
          },
        };
      }

      return {
        props: {
          ...args,
          ...eventHandlerProps,
        },
        template: `
          <div style="max-height: ${dynamicMaxHeight}; overflow: auto; border: 1px solid #dee2e6; border-radius: 8px;">
            <table style="border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0;">
              <thead>
                ${tableHeaders}
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>
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
            'All possible permutations of the component properties displayed in a combinatorial table format.',
        },
      },
      ...storyParameters,
    },
  } as StoryObj<T>;
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

// With custom excludeProps and split property
export const AllPermutations: Story = createPermutationStory({
  meta: yourMetaObject,
  excludeProps: ['text', 'clickEvent'], // Exclude props you don't want in permutations
  splitProperty: 'spacing', // Split this property into separate output columns
  excludeUndefined: ['color'], // Don't include undefined for color
  includeUndefined: ['icon'], // Always include undefined for icon (even if not in options)
  columnOrder: ['showCloseButton', 'icon'], // Show these columns first, others follow in default order
});

// Full customization
export const AllPermutations: Story = createPermutationStory({
  meta: yourMetaObject,
  excludeProps: ['text', 'clickEvent'],
  splitProperty: 'spacing',
  excludeUndefined: ['color'],
  includeUndefined: ['icon'],
  columnOrder: ['showCloseButton', 'icon', 'color'],
  textGenerators: {
    text: {
      mode: 'complex', // or 'constant'
      generator: (perm) => 'Custom text for ' + Object.values(perm).join('-'),
      constantText: 'Fixed Text'
    },
    label: {
      mode: 'constant',
      constantText: 'Always This Label'
    }
  },
  displayConfig: {
    gap: '1rem',
    maxHeight: '90vh',
    hideTable: false, // Set to true to show only components without table structure
    alignment: 'top-left', // Component alignment: top-left, top-center, top-right, center-left, center-center, center-right, bottom-left, bottom-center, bottom-right
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
