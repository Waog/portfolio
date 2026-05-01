import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UrlStateService } from '@portfolio/url-state';
import { EMPTY } from 'rxjs';

import { SearchTagService } from './search-tag.service';

describe('SearchTagService', () => {
  let service: SearchTagService;
  let mockRouter: Partial<Router>;
  let mockUrlStateService: Partial<UrlStateService>;

  beforeEach(() => {
    mockRouter = {
      url: '/',
      navigate: jest.fn().mockResolvedValue(true),
      events: EMPTY,
      parseUrl: jest.fn().mockReturnValue({ queryParams: {} }),
    };

    mockUrlStateService = {
      updateValue: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UrlStateService, useValue: mockUrlStateService },
      ],
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

  it('should set tags', fakeAsync(() => {
    service.addTag('Angular');
    tick();
    service.addTag('React');
    tick();

    service.setTags(['TypeScript', 'Vue']);
    tick();

    expect(service.currentTags).toEqual(['TypeScript', 'Vue']);
  }));

  it('should clone tags passed to setTags', fakeAsync(() => {
    const tags = ['TypeScript', 'Vue'];

    service.setTags(tags);
    tick();

    tags.push('Angular');

    expect(service.currentTags).toEqual(['TypeScript', 'Vue']);
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
