import { AwsNxPluginConfig } from '@aws/nx-plugin';

export default {
  iac: { provider: 'terraform' },
  containers: { engine: 'docker' },
  packageManager: { catalogs: true },
} satisfies AwsNxPluginConfig;
