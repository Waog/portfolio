import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

export interface SearchResult {
  id: number;
  query: string[];
}

@Injectable({
  providedIn: 'root',
})
export class SearchEngineService {
  private readonly querySubject = new BehaviorSubject<string[]>([]);
  private resultIdCounter = 0;

  readonly searchResult$: Observable<SearchResult> = this.querySubject.pipe(
    distinctUntilChanged(),
    map(query => this.getDummyResult(query))
  );

  setQuery(query: string[]): void {
    this.querySubject.next(query);
  }

  private getDummyResult(query: string[]): SearchResult {
    if (!query.length) {
      return { id: this.resultIdCounter++, query: [] };
    }

    return { id: this.resultIdCounter++, query };
  }
}
