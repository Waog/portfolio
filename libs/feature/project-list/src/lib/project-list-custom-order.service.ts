import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemoizeAllArgs } from '@portfolio/memoize';
import { Project, TopProjectsService } from '@portfolio/projects';

interface CustomOrderDiff {
  projectId: string;
  customIndex: number;
}

/**
 * Service responsible for managing custom project ordering.
 * Provides a self-contained interface for ordered projects.
 * Handles URL serialization/deserialization and order manipulation internally.
 */
@Injectable({
  providedIn: 'root',
})
export class ProjectListCustomOrderService {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private topProjectsService = inject(TopProjectsService);

  /**
   * Gets all projects in their proper order (prioritized, then custom ordered).
   * This is the main entry point - returns ready-to-display projects.
   */
  getOrderedProjects(): Project[] {
    const prioritizedProjects =
      this.topProjectsService.getPrioritizedProjects();
    const customDiffs = this.loadCustomOrderFromUrl();
    return this.applyCustomOrderPure(prioritizedProjects, customDiffs);
  }

  /**
   * Moves a project up and returns the new ordered list.
   */
  moveProjectUp(projectId: string): Project[] {
    const currentProjects = this.getOrderedProjects();
    const currentIndex = currentProjects.findIndex(p => p.id === projectId);

    if (currentIndex <= 0) {
      return currentProjects; // Already at the top
    }

    // Create new order with swapped positions
    const newOrder = currentProjects.map(p => p.id);
    [newOrder[currentIndex], newOrder[currentIndex - 1]] = [
      newOrder[currentIndex - 1],
      newOrder[currentIndex],
    ];

    // Convert to diffs and save to URL (async, don't wait for it)
    const prioritizedProjects =
      this.topProjectsService.getPrioritizedProjects();
    const customDiffs = this.calculateCustomDiffsPure(
      newOrder,
      prioritizedProjects.map(p => p.id)
    );
    this.saveCustomOrderToUrl(customDiffs);

    // Return the reordered projects immediately (based on diffs, not URL)
    return this.applyCustomOrderPure(prioritizedProjects, customDiffs);
  }

  /**
   * Moves a project down and returns the new ordered list.
   */
  moveProjectDown(projectId: string): Project[] {
    const currentProjects = this.getOrderedProjects();
    const currentIndex = currentProjects.findIndex(p => p.id === projectId);

    if (currentIndex < 0 || currentIndex >= currentProjects.length - 1) {
      return currentProjects; // Already at the bottom or not found
    }

    // Create new order with swapped positions
    const newOrder = currentProjects.map(p => p.id);
    [newOrder[currentIndex], newOrder[currentIndex + 1]] = [
      newOrder[currentIndex + 1],
      newOrder[currentIndex],
    ];

    // Convert to diffs and save to URL (async, don't wait for it)
    const prioritizedProjects =
      this.topProjectsService.getPrioritizedProjects();
    const customDiffs = this.calculateCustomDiffsPure(
      newOrder,
      prioritizedProjects.map(p => p.id)
    );
    this.saveCustomOrderToUrl(customDiffs);

    // Return the reordered projects immediately (based on diffs, not URL)
    return this.applyCustomOrderPure(prioritizedProjects, customDiffs);
  }

  /**
   * Loads custom order diffs from URL.
   */
  private loadCustomOrderFromUrl(): CustomOrderDiff[] {
    const orderParam = this.route.snapshot.queryParamMap.get('order');
    if (!orderParam || orderParam.trim() === '') {
      return [];
    }

    try {
      return this.parseOrderParamPure(orderParam);
    } catch (error) {
      console.warn(
        `Failed to load custom order from URL. Order param: "${orderParam}". Error: ${
          error instanceof Error ? error.message : error
        }`
      );
      return [];
    }
  }

  /**
   * Parses the order parameter string into CustomOrderDiff array (pure function).
   * Format: "projectId:position,projectId:position"
   */
  @MemoizeAllArgs
  private parseOrderParamPure(orderParam: string): CustomOrderDiff[] {
    return orderParam
      .split(',')
      .filter(part => part.trim() !== '')
      .map(part => {
        const [projectId, indexStr] = part.split(':');
        return {
          projectId: projectId.trim(),
          customIndex: parseInt(indexStr.trim(), 10),
        };
      })
      .filter(diff => !isNaN(diff.customIndex));
  }

  /**
   * Saves custom order diffs to URL.
   */
  private saveCustomOrderToUrl(customDiffs: CustomOrderDiff[]): void {
    const orderParam =
      customDiffs.length > 0
        ? customDiffs
            .map(diff => `${diff.projectId}:${diff.customIndex}`)
            .join(',')
        : null;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { order: orderParam },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  /**
   * Calculates the diffs between a custom order and the default order (pure function).
   */
  @MemoizeAllArgs
  private calculateCustomDiffsPure(
    customOrder: string[],
    defaultOrder: string[]
  ): CustomOrderDiff[] {
    const diffs: CustomOrderDiff[] = [];
    for (let i = 0; i < customOrder.length; i++) {
      if (customOrder[i] !== defaultOrder[i]) {
        diffs.push({ projectId: customOrder[i], customIndex: i });
      }
    }

    return diffs;
  }

  /**
   * Applies custom order diffs to projects (pure function).
   */
  @MemoizeAllArgs
  private applyCustomOrderPure(
    projects: Project[],
    customDiffs: CustomOrderDiff[]
  ): Project[] {
    if (customDiffs.length === 0) {
      return projects;
    }

    // Start with default order
    const projectIds = projects.map(p => p.id);

    // Remove projects that will be repositioned
    const idsToMove = new Set(customDiffs.map(d => d.projectId));
    const remaining = projectIds.filter(id => !idsToMove.has(id));

    // Insert projects at their custom positions
    for (const { projectId, customIndex } of customDiffs) {
      remaining.splice(customIndex, 0, projectId);
    }

    // Map back to Project objects
    const projectMap = new Map(projects.map(p => [p.id, p]));
    return remaining
      .map(id => projectMap.get(id))
      .filter((p): p is Project => p !== undefined);
  }
}
