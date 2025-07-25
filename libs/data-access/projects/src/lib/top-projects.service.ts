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
   * Returns the top 3 projects based on technology matches with current search tags.
   * Sorting criteria:
   * 1. Number of full matches (descending)
   * 2. Number of indirect matches (descending) - tie breaker
   * 3. Original order in projects.data.ts (ascending) - final tie breaker
   */
  getTopProjects(): Project[] {
    const searchTags = this.searchTagService.currentTags;

    // If no search tags, return empty array
    if (searchTags.length === 0) {
      return [];
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

    // Filter projects that have at least one match
    const projectsWithMatches = projectScores.filter(
      score => score.fullMatches > 0 || score.indirectMatches > 0
    );

    // Sort by criteria
    const sortedProjects = projectsWithMatches.sort((a, b) => {
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

    // Return top 3
    return sortedProjects.slice(0, 3).map(score => score.project);
  }

  getNonTopProjects(): Project[] {
    return this.projectService
      .getAll()
      .filter(project => !this.getTopProjects().includes(project));
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
