import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ProjectListCustomOrderService } from '@portfolio/project-list';
import { Project } from '@portfolio/search-engine-domain';

@Component({
  selector: 'lib-project-reorder-dialog',
  imports: [
    CdkDropList,
    CdkDrag,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './project-reorder-dialog.component.html',
  styleUrl: './project-reorder-dialog.component.scss',
})
export class ProjectReorderDialogComponent implements OnInit {
  private readonly customOrderService = inject(ProjectListCustomOrderService);
  private readonly destroyRef = inject(DestroyRef);

  protected projects: Project[] = [];

  ngOnInit(): void {
    this.customOrderService.projectsInOrder$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(projects => {
        this.projects = [...projects];
      });
  }

  protected drop(event: CdkDragDrop<Project[]>): void {
    moveItemInArray(this.projects, event.previousIndex, event.currentIndex);
    this.customOrderService.reorderProjects([...this.projects]);
  }

  protected slotClass(index: number): string {
    if (index < 3) {
      return 'slot-page-1';
    }
    if (index < 8) {
      return 'slot-page-2';
    }
    return '';
  }
}
