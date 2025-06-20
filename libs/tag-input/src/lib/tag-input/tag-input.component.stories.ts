import { provideRouter } from '@angular/router';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { BehaviorSubject } from 'rxjs';

import { SearchTagService } from './search-tag.service';
import { TagInputComponent } from './tag-input.component';

// Mock service for Storybook
class MockSearchTagService {
  private tagsSubject = new BehaviorSubject<string[]>([]);
  public readonly tags$ = this.tagsSubject.asObservable();

  public get currentTags(): string[] {
    return this.tagsSubject.value;
  }

  public addTag(tag: string): void {
    const trimmedTag = tag.trim();
    if (trimmedTag && !this.currentTags.includes(trimmedTag)) {
      const updatedTags = [...this.currentTags, trimmedTag];
      this.tagsSubject.next(updatedTags);
    }
  }

  public removeTag(tagToRemove: string): void {
    const updatedTags = this.currentTags.filter(tag => tag !== tagToRemove);
    this.tagsSubject.next(updatedTags);
  }

  // Initialize with specific tags for stories
  public initializeWithTags(tags: string[]): void {
    this.tagsSubject.next(tags);
  }
}

const meta: Meta<TagInputComponent> = {
  component: TagInputComponent,
  title: 'Tag Input/TagInputComponent',
  decorators: [
    moduleMetadata({
      providers: [
        { provide: SearchTagService, useClass: MockSearchTagService },
      ],
    }),
    applicationConfig({
      providers: [provideRouter([])],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A reusable tag input component that allows users to add and remove search terms using Angular Material components.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input field',
    },
  },
};

export default meta;
type Story = StoryObj<TagInputComponent>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'The default state of the tag input component with no tags.',
      },
    },
  },
};

export const WithSingleTag: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: SearchTagService,
          useFactory: () => {
            const service = new MockSearchTagService();
            service.initializeWithTags(['Angular']);
            return service;
          },
        },
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with a single tag.',
      },
    },
  },
};

export const WithMultipleTags: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: SearchTagService,
          useFactory: () => {
            const service = new MockSearchTagService();
            service.initializeWithTags([
              'Angular',
              'TypeScript',
              'RxJS',
              'Material Design',
            ]);
            return service;
          },
        },
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Shows the component with multiple tags demonstrating tag management.',
      },
    },
  },
};

export const WithLongTags: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: SearchTagService,
          useFactory: () => {
            const service = new MockSearchTagService();
            service.initializeWithTags([
              'Very Long Technology Name',
              'JavaScript',
              'Enterprise Application Development',
              'Modern Web Development Framework',
            ]);
            return service;
          },
        },
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Shows how the component handles longer tag names.',
      },
    },
  },
};

export const WithManyTags: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: SearchTagService,
          useFactory: () => {
            const service = new MockSearchTagService();
            service.initializeWithTags([
              'Angular',
              'TypeScript',
              'RxJS',
              'Material Design',
              'JavaScript',
              'HTML',
              'CSS',
              'Sass',
              'Jest',
              'Storybook',
              'Nx',
              'Node.js',
            ]);
            return service;
          },
        },
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Shows the component with many tags to test layout and wrapping behavior.',
      },
    },
  },
};
