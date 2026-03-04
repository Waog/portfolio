import { SearchEngineService } from '@portfolio/search-engine-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BehaviorSubject } from 'rxjs';

import { SkillSectionComponent } from './skill-section.component';

class MockSearchEngineService {
  private searchResultSubject = new BehaviorSubject({
    loading: false,
    ui: {
      skills: [
        {
          category: 'Frontend',
          tagLists: {
            fullMatches: ['Angular', 'TypeScript'],
            partialMatches: ['RxJS', 'Storybook', 'Playwright'],
            nonMatches: [
              'Vue',
              'React',
              'Svelte',
              'SolidJS',
              'Backbone',
              'jQuery',
              'Ember',
              'Lit',
              'Preact',
              'Alpine.js',
            ],
          },
        },
        {
          category: 'Backend',
          tagLists: {
            fullMatches: ['Node.js', 'Express'],
            partialMatches: ['REST API', 'OpenAPI', 'PostgreSQL'],
            nonMatches: [
              'GraphQL',
              'Redis',
              'MongoDB',
              'Auth0',
              'WebSockets',
              'gRPC',
              'RabbitMQ',
              'Kafka',
              'Elasticsearch',
              'Cassandra',
            ],
          },
        },
        {
          category: 'DevOps',
          tagLists: {
            fullMatches: ['Docker', 'GitHub Actions'],
            partialMatches: ['Nx', 'CI/CD', 'Linux'],
            nonMatches: [
              'Nginx',
              'Kubernetes',
              'Terraform',
              'Azure',
              'Prometheus',
              'Grafana',
              'AWS',
              'GCP',
              'Ansible',
              'Helm',
            ],
          },
        },
      ],
    },
  });

  public readonly searchResult$ = this.searchResultSubject.asObservable();
}

const meta: Meta<SkillSectionComponent> = {
  component: SkillSectionComponent,
  title: 'Feature/Skill Section',
  decorators: [
    moduleMetadata({
      providers: [
        { provide: SearchEngineService, useClass: MockSearchEngineService },
      ],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SkillSectionComponent>;

export const Default: Story = {};
