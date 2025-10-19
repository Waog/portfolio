import { inject, Injectable } from '@angular/core';
import { MemoizeAllArgs } from '@portfolio/memoize';
import { SearchTagService } from '@portfolio/search-tags';

import { Project } from './project';
import { ProjectService } from './project.service';
import { TechnologyMatchingService } from './technology-matching.service';

interface ProjectScore {
  project: Project;
  fullMatches: number;
  indirectMatches: number;
  originalIndex: number;
}

@Injectable({
  providedIn: 'root',
})
export class TopProjectsService {
  private searchTagService = inject(SearchTagService);
  private technologyMatchingService = inject(TechnologyMatchingService);
  private projectService = inject(ProjectService);

  /**
   * Returns all projects in prioritized order.
   * When search tags are active, projects are sorted by:
   * 1. Number of full matches (descending)
   * 2. Number of indirect matches (descending) - tie breaker
   * 3. Original order in projects.data.ts (ascending) - final tie breaker
   *
   * When no search tags are active, returns all projects in their original order.
   */
  getPrioritizedProjects(): Project[] {
    const searchTags = this.searchTagService.currentTags;
    return this.getPrioritizedProjectsMemoized(searchTags);
  }

  @MemoizeAllArgs
  private getPrioritizedProjectsMemoized(searchTags: string[]): Project[] {
    // If no search tags, return all projects in original order
    if (searchTags.length === 0) {
      return this.projectService.getAll();
    }

    // Score all projects
    const projectScores: ProjectScore[] = this.projectService
      .getAll()
      .map((project, index) => ({
        project,
        fullMatches: this.countFullMatches(project, searchTags),
        indirectMatches: this.countIndirectMatches(project, searchTags),
        originalIndex: index,
      }));

    // Sort by criteria (projects with matches will naturally float to the top)
    const sortedProjects = projectScores.sort((a, b) => {
      // Primary: full matches (descending)
      if (a.fullMatches !== b.fullMatches) {
        return b.fullMatches - a.fullMatches;
      }

      // Secondary: indirect matches (descending)
      if (a.indirectMatches !== b.indirectMatches) {
        return b.indirectMatches - a.indirectMatches;
      }

      // Tertiary: original order (ascending)
      return a.originalIndex - b.originalIndex;
    });

    // Return all projects in prioritized order
    return sortedProjects.map(score => score.project);
  }

  @MemoizeAllArgs
  private countFullMatches(project: Project, searchTags: string[]): number {
    return project.technologies.filter(
      technology =>
        this.technologyMatchingService.getBestMatchTypeForKeywordTag({
          keywordTag: technology,
          searchTags,
        }) === 'full'
    ).length;
  }

  @MemoizeAllArgs
  private countIndirectMatches(project: Project, searchTags: string[]): number {
    return project.technologies.filter(
      technology =>
        this.technologyMatchingService.getBestMatchTypeForKeywordTag({
          keywordTag: technology,
          searchTags,
        }) === 'indirect'
    ).length;
  }
}
