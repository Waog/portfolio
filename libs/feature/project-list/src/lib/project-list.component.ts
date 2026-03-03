import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Project } from '@portfolio/search-engine-domain';
import { SectionHeaderComponent } from '@portfolio/section-header';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { Observable } from 'rxjs';

import { ProjectItemComponent } from './project-item.component';
import { ProjectListCustomOrderService } from './project-list-custom-order.service';

@Component({
  selector: 'lib-project-list',
  imports: [
    CommonModule,
    ProjectItemComponent,
    MatButtonModule,
    MatIconModule,
    SectionHeaderComponent,
    NgxJsonViewerModule,
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent implements OnInit {
  private customOrderService = inject(ProjectListCustomOrderService);

  projectsOrder$: Observable<Project[]> =
    this.customOrderService.projectsInOrder$;
  showAllProjects = false;
  isPrintModeActive = false;

  ngOnInit(): void {
    // Check print mode (this doesn't change dynamically in most cases)
    this.isPrintModeActive = this.checkPrintMode();
  }

  toggleAllProjects(): void {
    this.showAllProjects = !this.showAllProjects;
  }

  checkPrintMode(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('print').matches
    );
  }

  /**
   * Moves a project up in the custom order.
   */
  moveProjectUp(projectId: string): void {
    this.customOrderService.moveProjectUp(projectId);
  }

  /**
   * Moves a project down in the custom order.
   */
  moveProjectDown(projectId: string): void {
    this.customOrderService.moveProjectDown(projectId);
  }
}
