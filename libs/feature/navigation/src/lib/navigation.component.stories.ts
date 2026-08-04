import { provideRouter } from '@angular/router';
import { SearchEngineService } from '@portfolio/search-engine-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { BehaviorSubject } from 'rxjs';

import { NavigationComponent } from './navigation.component';

class MockSearchEngineService {
  private readonly searchResultSubject = new BehaviorSubject({
    loading: false,
    ngService: {
      loading: false,
      progressPercent: 0,
    },
  });

  readonly searchResult$ = this.searchResultSubject.asObservable();
}

const meta: Meta<NavigationComponent> = {
  component: NavigationComponent,
  title: 'Feature/Navigation',
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
    moduleMetadata({
      providers: [
        {
          provide: SearchEngineService,
          useClass: MockSearchEngineService,
        },
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<NavigationComponent>;

export const Default: Story = {};
