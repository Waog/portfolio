import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';

import { SearchTagService } from './search-tag.service';

describe('SearchTagService', () => {
  let service: SearchTagService;
  let mockRouter: Partial<Router>;

  beforeEach(() => {
    mockRouter = {
      url: '/',
      navigate: jest.fn().mockResolvedValue(true),
      parseUrl: jest.fn().mockReturnValue({ queryParams: {} }),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: mockRouter }],
    });

    service = TestBed.inject(SearchTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty tags', () => {
    expect(service.currentTags).toEqual([]);
  });

  it('should add a tag', fakeAsync(() => {
    service.addTag('Angular');
    tick();
    expect(service.currentTags).toEqual(['Angular']);
  }));

  it('should not add duplicate tags', fakeAsync(() => {
    service.addTag('Angular');
    tick();
    service.addTag('Angular');
    tick();
    expect(service.currentTags).toEqual(['Angular']);
  }));

  it('should remove a tag', fakeAsync(() => {
    service.addTag('Angular');
    tick();
    service.addTag('React');
    tick();
    service.removeTag('Angular');
    tick();
    expect(service.currentTags).toEqual(['React']);
  }));

  it('should clear all tags', fakeAsync(() => {
    service.addTag('Angular');
    tick();
    service.addTag('React');
    tick();
    service.clearAllTags();
    tick();
    expect(service.currentTags).toEqual([]);
  }));

  it('should check if tag exists', fakeAsync(() => {
    service.addTag('Angular');
    tick();
    expect(service.hasTag('Angular')).toBe(true);
    expect(service.hasTag('React')).toBe(false);
  }));

  it('should emit tag changes through observable', fakeAsync(() => {
    let emittedTags: string[] | null = null;
    service.tags$.subscribe(tags => {
      emittedTags = tags;
    });

    service.addTag('Angular');
    tick();

    expect(emittedTags).toEqual(['Angular']);
  }));
});
