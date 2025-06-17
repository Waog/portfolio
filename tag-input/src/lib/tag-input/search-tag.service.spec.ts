import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { SearchTagService } from './search-tag.service';

describe('SearchTagService', () => {
  let service: SearchTagService;
  let mockRouter: Partial<Router>;

  beforeEach(() => {
    mockRouter = {
      url: '/',
      navigate: jest.fn(),
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

  it('should add a tag', () => {
    service.addTag('Angular');
    expect(service.currentTags).toEqual(['Angular']);
  });

  it('should not add duplicate tags', () => {
    service.addTag('Angular');
    service.addTag('Angular');
    expect(service.currentTags).toEqual(['Angular']);
  });

  it('should remove a tag', () => {
    service.addTag('Angular');
    service.addTag('React');
    service.removeTag('Angular');
    expect(service.currentTags).toEqual(['React']);
  });

  it('should clear all tags', () => {
    service.addTag('Angular');
    service.addTag('React');
    service.clearAllTags();
    expect(service.currentTags).toEqual([]);
  });

  it('should check if tag exists', () => {
    service.addTag('Angular');
    expect(service.hasTag('Angular')).toBe(true);
    expect(service.hasTag('React')).toBe(false);
  });

  it('should emit tag changes through observable', done => {
    service.tags$.subscribe(tags => {
      if (tags.length === 1) {
        expect(tags).toEqual(['Angular']);
        done();
      }
    });

    service.addTag('Angular');
  });
});
