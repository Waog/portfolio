const nxPreset = require('@nx/jest/preset').default;

/**
 * ESM-only packages that need to be transformed by Jest
 * Add new packages here as needed
 */
const esmOnlyPackages = ['array-move'];

/**
 * Build a regex pattern that allows specified packages to be transformed
 * while ignoring the rest of node_modules for performance
 */
function buildTransformIgnorePattern(esmPackages) {
  if (esmPackages.length === 0) {
    return ['node_modules/(?!.*\\.mjs$)'];
  }
  const packagePattern = esmPackages.join('|');
  return [`node_modules/(?!.*\\.mjs$|${packagePattern})`];
}

module.exports = {
  ...nxPreset,
  transformIgnorePatterns: buildTransformIgnorePattern(esmOnlyPackages),
};
