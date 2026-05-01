module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    // Ignore dependabot commit messages
    message => message.includes('Signed-off-by: dependabot[bot]'),

    // Ignore commit messages by GitHub Copilot cloud agent
    message => message.includes('Agent-Logs-Url: https://github.com/'),
  ],
  defaultIgnores: true, // Ensures default ignores (like 'Merge branch...') are kept
};
