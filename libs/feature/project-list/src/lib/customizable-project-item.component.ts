import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CustomizationStateService } from '@portfolio/customization-state';
import { Project } from '@portfolio/search-engine-domain';

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

  project = input.required<Project>();
  isTopProject = input<boolean>(false);
  compact = input<boolean>(false);
  printMode = input<boolean>(false);

  private readonly customIsTopProject = signal<boolean | null>(null);
  private readonly customCompact = signal<boolean | null>(null);

  readonly effectiveIsTopProject = computed(
    () => this.customIsTopProject() ?? this.isTopProject()
  );
  readonly effectiveCompact = computed(
    () => this.customCompact() ?? this.compact()
  );

  protected setIsTopProject(isTopProject: boolean): void {
    this.customIsTopProject.set(isTopProject);
  }

  protected setCompact(compact: boolean): void {
    this.customCompact.set(compact);
  }
}
