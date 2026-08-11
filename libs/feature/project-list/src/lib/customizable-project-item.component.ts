import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CustomizationStateService } from '@portfolio/customization-state';
import { Project } from '@portfolio/search-engine-domain';

import { CustomizableProjectItemUrlService } from './customizable-project-item-url.service';
import { ProjectItemComponent } from './project-item.component';

@Component({
  selector: 'lib-customizable-project-item',
  imports: [CommonModule, MatButtonToggleModule, ProjectItemComponent],
  templateUrl: './customizable-project-item.component.html',
  styleUrl: './customizable-project-item.component.scss',
})
export class CustomizableProjectItemComponent {
  protected readonly customizationStateService = inject(
    CustomizationStateService
  );
  private readonly customizableProjectItemUrlService = inject(
    CustomizableProjectItemUrlService
  );

  project = input.required<Project>();
  isTopProject = input<boolean>(false);
  compact = input<boolean>(false);
  printMode = input<boolean>(false);

  private readonly customIsTopProject = computed(() =>
    this.customizableProjectItemUrlService.getIsTopProject(this.project().id)
  );
  private readonly customCompact = computed(() =>
    this.customizableProjectItemUrlService.getCompact(this.project().id)
  );

  readonly effectiveIsTopProject = computed(
    () => this.customIsTopProject() ?? this.isTopProject()
  );
  readonly effectiveCompact = computed(
    () => this.customCompact() ?? this.compact()
  );

  protected setIsTopProject(isTopProject: boolean): void {
    this.customizableProjectItemUrlService.setIsTopProject(
      this.project().id,
      this.isTopProject() === isTopProject ? null : isTopProject
    );
  }

  protected setCompact(compact: boolean): void {
    this.customizableProjectItemUrlService.setCompact(
      this.project().id,
      this.compact() === compact ? null : compact
    );
  }
}
