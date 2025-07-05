#!/usr/bin/env node

/**
 * SCSS Implicit Dependencies Checker
 *
 * This script ensures that projects using shared-styles imports have proper
 * implicit dependencies declared in their project.json files.
 *
 * @fileoverview Validates SCSS files for shared-styles imports and ensures
 * corresponding project.json files have "implicitDependencies": ["shared-styles"]
 *
 * @example
 * // Command line usage:
 * node libs/util/shared-styles/scripts/check-scss-dependencies.js
 *
 * // Via npm script:
 * npm run check-scss-dependencies
 *
 * // Via nx run:
 * nx run shared-styles:check-scss-dependencies
 *
 * // Programmatic usage:
 * const { main } = require('./check-scss-dependencies.js');
 * await main();
 *
 * @author Portfolio Project
 * @since 2024
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Main execution
if (require.main === module) {
  main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

/**
 * Main orchestration function that coordinates the entire SCSS dependency check
 * @returns {Promise<void>} Resolves when check completes, exits process on errors
 * @example
 * // Called from command line or programmatically
 * await main();
 * // Output: Console messages and process.exit(0 or 1)
 */
async function main() {
  try {
    console.log(
      'Checking SCSS files for shared-styles implicit dependencies...\n'
    );

    const sharedStylesImports = getSharedStylesImports();
    const scssFiles = await findAllScssFiles();
    const { hasErrors, checkedImports } = await checkAllScssFiles(
      scssFiles,
      sharedStylesImports
    );

    handleResults(hasErrors, checkedImports, sharedStylesImports);
  } catch (error) {
    console.error('Error during SCSS dependency check:', error);
    process.exit(1);
  }
}

/**
 * Validates all SCSS files for proper implicit dependencies
 * @param {string[]} scssFiles - Array of SCSS file paths
 * @param {string[]} sharedStylesImports - Array of available shared-styles import names
 * @returns {Promise<{hasErrors: boolean, checkedImports: Set<string>}>} Results and usage summary
 * @example
 * // Input:
 * scssFiles = ['libs/feature/about-me/src/lib/about-me.component.scss']
 * sharedStylesImports = ['breakpoints', 'nav-scroll-spacer']
 * // Output:
 * { hasErrors: false, checkedImports: Set(['breakpoints']) }
 */
async function checkAllScssFiles(scssFiles, sharedStylesImports) {
  let hasErrors = false;
  const checkedImports = new Set();
  const projectJsonCache = new Map(); // Cache to avoid repeated reads

  for (const scssFile of scssFiles) {
    try {
      const fullPath = path.resolve(scssFile);
      const fileSharedStylesImports = checkFileForSharedStylesImports(
        fullPath,
        sharedStylesImports
      );

      if (fileSharedStylesImports.length === 0) {
        continue; // No shared-styles imports, skip
      }

      // Track which imports are actually being used
      fileSharedStylesImports.forEach(imp => checkedImports.add(imp));

      const projectJsonPath = findProjectJsonPath(fullPath);
      if (!projectJsonPath) {
        console.warn(`⚠️  Could not find project.json for ${scssFile}`);
        continue;
      }

      // Use cache to avoid repeated reads of the same project.json
      let hasImplicitDependency;
      if (projectJsonCache.has(projectJsonPath)) {
        hasImplicitDependency = projectJsonCache.get(projectJsonPath);
      } else {
        hasImplicitDependency =
          hasSharedStylesImplicitDependency(projectJsonPath);
        projectJsonCache.set(projectJsonPath, hasImplicitDependency);
      }

      if (!hasImplicitDependency) {
        hasErrors = true;
        reportError(scssFile, fileSharedStylesImports, projectJsonPath);
      } else {
        console.log(`✅ ${scssFile} - OK`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${scssFile}:`, error.message);
      hasErrors = true;
    }
  }

  return { hasErrors, checkedImports };
}

/**
 * Dynamically retrieves available shared-styles imports from the index.scss file
 * @returns {string[]} Array of available shared-styles import names
 * @example
 * // Returns: ['breakpoints', 'nav-scroll-spacer']
 */
function getSharedStylesImports() {
  const indexScssPath = path.resolve(
    'libs/util/shared-styles/src/lib/index.scss'
  );

  try {
    if (!fs.existsSync(indexScssPath)) {
      throw new Error(`Index file not found at ${indexScssPath}`);
    }

    const content = fs.readFileSync(indexScssPath, 'utf8');
    const imports = [];

    // Match @forward statements and extract the import name
    const forwardRegex = /@forward\s+['"]\.\/([^'"]+)['"]/g;
    let match;

    while ((match = forwardRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }

    if (imports.length === 0) {
      console.warn(
        '⚠️  No @forward statements found in index.scss, using fallback imports'
      );
      return ['breakpoints', 'nav-scroll-spacer'];
    }

    return imports;
  } catch (error) {
    console.error(
      `❌ Error reading shared-styles index.scss: ${error.message}`
    );
    console.warn('🔄 Using fallback shared-styles imports');
    // Fallback to hardcoded values if index.scss cannot be read
    return ['breakpoints', 'nav-scroll-spacer'];
  }
}

/**
 * Finds all SCSS files in the workspace (excluding node_modules, dist, and shared-styles)
 * @returns {Promise<string[]>} Array of SCSS file paths
 * @example
 * // Returns: ['libs/feature/about-me/src/lib/about-me.component.scss', ...]
 */
async function findAllScssFiles() {
  try {
    const files = await glob('**/*.scss', {
      ignore: [
        '**/node_modules/**',
        '**/dist/**',
        '**/libs/util/shared-styles/**',
      ],
      cwd: process.cwd(),
    });

    if (files.length === 0) {
      console.warn('⚠️  No SCSS files found in the workspace');
    }

    return files;
  } catch (error) {
    console.error(`❌ Error finding SCSS files: ${error.message}`);
    throw error;
  }
}

/**
 * Handles the final results of the SCSS dependency check
 * @param {boolean} hasErrors - Whether any errors were found
 * @param {Set<string>} checkedImports - Set of shared-styles imports that were actually used
 * @param {string[]} availableImports - Array of all available shared-styles imports
 * @returns {void} Logs results and exits process
 * @example
 * // Input:
 * hasErrors = false
 * checkedImports = Set(['breakpoints'])
 * availableImports = ['breakpoints', 'nav-scroll-spacer', 'colors']
 * // Output: Console log with summary and process.exit(0)
 */
function handleResults(hasErrors, checkedImports, availableImports) {
  console.log(''); // Empty line before summary

  if (checkedImports.size > 0) {
    const usedImports = Array.from(checkedImports);
    const unusedImports = availableImports.filter(
      imp => !checkedImports.has(imp)
    );

    console.log('📊 Used shared-styles imports:');
    usedImports.forEach(imp => console.log(`  - ${imp}`));

    if (unusedImports.length > 0) {
      console.log('💤 Unused shared-styles imports:');
      unusedImports.forEach(imp => console.log(`  - ${imp}`));
    }
  } else {
    console.log('📊 No shared-styles imports found in any SCSS files.');
  }

  if (hasErrors) {
    console.error(
      '\n🚨 Some SCSS files use shared-styles imports but their projects are missing implicit dependencies.'
    );
    console.error(
      'Please add "implicitDependencies": ["shared-styles"] to the project.json files listed above.'
    );
    process.exit(1);
  } else {
    console.log(
      '\n✅ All SCSS files with shared-styles imports have proper implicit dependencies.'
    );
  }
}

/**
 * Reports detailed error information for a file with missing implicit dependencies
 * @param {string} scssFile - Path to the SCSS file with errors
 * @param {string[]} sharedStylesImports - Array of shared-styles imports found in the file
 * @param {string} projectJsonPath - Path to the project.json file
 * @returns {void} Logs error details to console
 * @example
 * // Input:
 * scssFile = 'libs/feature/about-me/src/lib/about-me.component.scss'
 * sharedStylesImports = ['breakpoints']
 * projectJsonPath = 'libs/feature/about-me/project.json'
 * // Output: Console error messages with file details
 */
function reportError(scssFile, sharedStylesImports, projectJsonPath) {
  console.error(`❌ ${scssFile}`);
  console.error(
    `   Uses shared-styles imports: ${sharedStylesImports.join(', ')}`
  );
  console.error(`   Project: ${path.relative(process.cwd(), projectJsonPath)}`);
  console.error(`   Missing: "implicitDependencies": ["shared-styles"]`);
  console.error('');
}

/**
 * Checks a single SCSS file for shared-styles imports
 * @param {string} scssFilePath - Absolute path to the SCSS file
 * @param {string[]} sharedStylesImports - Array of available shared-styles import names
 * @returns {string[]} Array of shared-styles imports found in the file
 * @example
 * // Input:
 * scssFilePath = '/path/to/component.scss'
 * sharedStylesImports = ['breakpoints', 'nav-scroll-spacer']
 * // File contains: @use 'breakpoints' as bp;
 * // Returns: ['breakpoints']
 */
function checkFileForSharedStylesImports(scssFilePath, sharedStylesImports) {
  try {
    if (!fs.existsSync(scssFilePath)) {
      throw new Error(`File not found: ${scssFilePath}`);
    }

    const content = fs.readFileSync(scssFilePath, 'utf8');
    const foundImports = [];

    // Look for @use statements importing any of the shared-styles
    const useRegex = /@use\s+['"]([^'"]+)['"]/g;
    let match;

    while ((match = useRegex.exec(content)) !== null) {
      const importName = match[1];
      if (sharedStylesImports.includes(importName)) {
        foundImports.push(importName);
      }
    }

    return foundImports;
  } catch (error) {
    console.error(`❌ Error reading SCSS file ${scssFilePath}:`, error.message);
    return [];
  }
}

/**
 * Finds the project.json file for a given SCSS file by walking up the directory tree
 * @param {string} scssFilePath - Absolute path to the SCSS file
 * @returns {string|null} Path to the project.json file, or null if not found
 * @example
 * // Input: '/path/to/libs/feature/about-me/src/lib/component.scss'
 * // Returns: '/path/to/libs/feature/about-me/project.json'
 */
function findProjectJsonPath(scssFilePath) {
  try {
    let currentDir = path.dirname(scssFilePath);
    const workspaceRoot = process.cwd();

    // Safety check to prevent infinite loops
    const maxIterations = 20;
    let iterations = 0;

    // Look for project.json file by walking up the directory tree
    while (
      currentDir !== workspaceRoot &&
      currentDir !== path.dirname(currentDir) &&
      iterations < maxIterations
    ) {
      const projectJsonPath = path.join(currentDir, 'project.json');
      if (fs.existsSync(projectJsonPath)) {
        return projectJsonPath;
      }
      currentDir = path.dirname(currentDir);
      iterations++;
    }

    return null;
  } catch (error) {
    console.error(
      `❌ Error finding project.json for ${scssFilePath}:`,
      error.message
    );
    return null;
  }
}

/**
 * Checks if a project.json file contains the shared-styles implicit dependency
 * @param {string} projectJsonPath - Absolute path to the project.json file
 * @returns {boolean} True if the project has shared-styles implicit dependency
 * @example
 * // Input: '/path/to/project.json' containing {"implicitDependencies": ["shared-styles"]}
 * // Returns: true
 */
function hasSharedStylesImplicitDependency(projectJsonPath) {
  try {
    if (!fs.existsSync(projectJsonPath)) {
      throw new Error(`Project file not found: ${projectJsonPath}`);
    }

    const content = fs.readFileSync(projectJsonPath, 'utf8');

    let projectJson;
    try {
      projectJson = JSON.parse(content);
    } catch (parseError) {
      throw new Error(
        `Invalid JSON in ${projectJsonPath}: ${parseError.message}`
      );
    }

    const implicitDependencies = projectJson.implicitDependencies || [];
    return implicitDependencies.includes('shared-styles');
  } catch (error) {
    console.error(
      `❌ Error reading project.json ${projectJsonPath}:`,
      error.message
    );
    return false;
  }
}

// Export functions for testing
module.exports = {
  checkFileForSharedStylesImports,
  hasSharedStylesImplicitDependency,
  findProjectJsonPath,
  getSharedStylesImports,
};
