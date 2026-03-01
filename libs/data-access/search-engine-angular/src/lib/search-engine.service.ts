import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

interface SearchResult {
  id: string;
  query: string;
}

@Injectable({
  providedIn: 'root',
})
export class SearchEngineService {
  private readonly querySubject = new BehaviorSubject<string>('');

  readonly searchResult$: Observable<SearchResult> = this.querySubject.pipe(
    distinctUntilChanged(),
    map(query => this.getDummyResult(query))
  );

  setQuery(query: string): void {
    this.querySubject.next(query);
  }

  private getDummyResult(query: string): SearchResult {
    if (!query.trim()) {
      return { id: '0', query: 'No result' };
    }

    return { id: '1', query };
  }
}
