import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { HeroHiddenLinkService } from './hero-hidden-link.service';

describe('HeroHiddenLinkService', () => {
  function createService(params: {
    href?: string;
    routerUrl?: string;
  }): HeroHiddenLinkService {
    TestBed.configureTestingModule({
      providers: [
        HeroHiddenLinkService,
        {
          provide: DOCUMENT,
          useValue: {
            location: {
              href: params.href,
            },
          },
        },
        {
          provide: Router,
          useValue: {
            url: params.routerUrl ?? '/',
          },
        },
      ],
    });

    return TestBed.inject(HeroHiddenLinkService);
  }

  it('removes customizationPanelShown and keeps all other URL parts', () => {
    const service = createService({
      href: 'https://oliverstadie.com/?customizationPanelShown=true&searchTags=React&printMode=true&skillMatrixExperienceUnit=time&projectSortOrder=date&printProjectPageSizes=3,5,5#projects',
    });

    const parsed = new URL(service.getHiddenLinkUrl());

    expect(parsed.origin).toBe('https://oliverstadie.com');
    expect(parsed.hash).toBe('');
    expect(parsed.searchParams.get('customizationPanelShown')).toBeNull();
    expect(parsed.searchParams.get('searchTags')).toBe('React');
    expect(parsed.searchParams.get('printMode')).toBe('true');
  });

  it('replaces localhost origin with production origin', () => {
    const service = createService({
      href: 'http://localhost:4200/?customizationPanelShown=true&searchTags=React&printMode=true&skillMatrixExperienceUnit=time&projectSortOrder=date&printProjectPageSizes=3,5,5#projects',
    });

    const parsed = new URL(service.getHiddenLinkUrl());

    expect(parsed.origin).toBe('https://oliverstadie.com');
    expect(parsed.hash).toBe('');
    expect(parsed.searchParams.get('customizationPanelShown')).toBeNull();
  });

  it('keeps non-localhost origin unchanged', () => {
    const service = createService({
      href: 'https://preview.oliverstadie.dev/?customizationPanelShown=true&searchTags=React#projects',
    });

    const parsed = new URL(service.getHiddenLinkUrl());

    expect(parsed.origin).toBe('https://preview.oliverstadie.dev');
    expect(parsed.hash).toBe('');
    expect(parsed.searchParams.get('customizationPanelShown')).toBeNull();
    expect(parsed.searchParams.get('searchTags')).toBe('React');
  });

  it('keeps URL unchanged when customizationPanelShown is not present', () => {
    const service = createService({
      href: 'https://oliverstadie.com/?searchTags=React&printMode=true&skillMatrixExperienceUnit=time&projectSortOrder=date&printProjectPageSizes=3,5,5#projects',
    });

    const parsed = new URL(service.getHiddenLinkUrl());

    expect(parsed.origin).toBe('https://oliverstadie.com');
    expect(parsed.hash).toBe('');
    expect(parsed.searchParams.get('searchTags')).toBe('React');
    expect(parsed.searchParams.get('printMode')).toBe('true');
  });

  it('removes customizationPanelShown when it is false', () => {
    const service = createService({
      href: 'https://oliverstadie.com/?customizationPanelShown=false&searchTags=React&printMode=true&skillMatrixExperienceUnit=time&projectSortOrder=date&printProjectPageSizes=3,5,5#projects',
    });

    const parsed = new URL(service.getHiddenLinkUrl());

    expect(parsed.origin).toBe('https://oliverstadie.com');
    expect(parsed.hash).toBe('');
    expect(parsed.searchParams.get('customizationPanelShown')).toBeNull();
    expect(parsed.searchParams.get('searchTags')).toBe('React');
  });

  it('falls back to router url when location href is missing', () => {
    const service = createService({
      href: undefined,
      routerUrl:
        '/?customizationPanelShown=true&searchTags=React&printMode=true&skillMatrixExperienceUnit=time&projectSortOrder=date&printProjectPageSizes=3,5,5#projects',
    });

    const parsed = new URL(service.getHiddenLinkUrl());

    expect(parsed.origin).toBe('https://oliverstadie.com');
    expect(parsed.pathname).toBe('/');
    expect(parsed.hash).toBe('');
    expect(parsed.searchParams.get('customizationPanelShown')).toBeNull();
    expect(parsed.searchParams.get('searchTags')).toBe('React');
  });

  it('creates an absolute URL from router url fallback without relative path assumptions', () => {
    const service = createService({
      href: undefined,
      routerUrl:
        '/?customizationPanelShown=true&searchTags=React&printMode=true&skillMatrixExperienceUnit=time&projectSortOrder=date&printProjectPageSizes=3,5,5',
    });

    const parsed = new URL(service.getHiddenLinkUrl());

    expect(parsed.origin).toBe('https://oliverstadie.com');
    expect(parsed.pathname).toBe('/');
    expect(parsed.hash).toBe('');
  });
});
