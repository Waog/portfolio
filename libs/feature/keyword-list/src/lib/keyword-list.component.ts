import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ColorChipListComponent } from '@portfolio/color-chip-list';
import { MatchType, TechnologyMatchingService } from '@portfolio/projects';
import { Tag } from '@portfolio/taxonomy';

interface TagWithMatchType {
  tag: Tag;
  matchType: MatchType;
}

@Component({
  selector: 'lib-keyword-list',
  imports: [CommonModule, ColorChipListComponent],
  templateUrl: './keyword-list.component.html',
  styleUrl: './keyword-list.component.scss',
})
export class KeywordListComponent {
  private technologyMatchingService = inject(TechnologyMatchingService);

  keywordTags = input.required<Tag[]>();

  get tagsWithMatchType(): TagWithMatchType[] {
    return this.keywordTags().map(keywordTag => ({
      tag: keywordTag,
      matchType: this.technologyMatchingService.getBestMatchTypeForKeywordTag({
        keywordTag,
      }),
    }));
  }

  get greenTechnologies(): string[] {
    return this.tagsWithMatchType
      .filter(tagWithMatchType => tagWithMatchType.matchType === 'full')
      .map(tagWithMatchType => tagWithMatchType.tag.canonical);
  }

  get yellowTechnologies(): string[] {
    return this.tagsWithMatchType
      .filter(tagWithMatchType => tagWithMatchType.matchType === 'indirect')
      .map(tagWithMatchType => tagWithMatchType.tag.canonical);
  }

  get grayTechnologies(): string[] {
    return this.tagsWithMatchType
      .filter(tagWithMatchType => tagWithMatchType.matchType === 'none')
      .map(tagWithMatchType => tagWithMatchType.tag.canonical);
  }
}
