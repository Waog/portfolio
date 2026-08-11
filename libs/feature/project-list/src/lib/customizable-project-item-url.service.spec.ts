import { TestBed } from '@angular/core/testing';
import {
  DefaultUrlSerializer,
  NavigationEnd,
  Router,
  UrlTree,
} from '@angular/router';
import { UrlStateService } from '@portfolio/url-state';
import { Subject } from 'rxjs';

import { CustomizableProjectItemUrlService } from './customizable-project-item-url.service';

describe('CustomizableProjectItemUrlService', () => {
  let service: CustomizableProjectItemUrlService;
  let routerMock: {
    url: string;
    events: Subject<NavigationEnd>;
    parseUrl: (url: string) => UrlTree;
  };
  let urlStateServiceMock: { updateValue: jest.Mock };

  beforeEach(() => {
    const urlSerializer = new DefaultUrlSerializer();

    routerMock = {
      url: '/',
      events: new Subject<NavigationEnd>(),
      parseUrl: (url: string) => urlSerializer.parse(url),
    };

    urlStateServiceMock = {
      updateValue: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        CustomizableProjectItemUrlService,
        { provide: Router, useValue: routerMock },
        { provide: UrlStateService, useValue: urlStateServiceMock },
      ],
    });
  });

  function createService(): CustomizableProjectItemUrlService {
    return TestBed.inject(CustomizableProjectItemUrlService);
  }

  it('can create', () => {
    service = createService();
    expect(service).toBeInstanceOf(CustomizableProjectItemUrlService);
  });

  it('returns null for isTopProject/compact by default', () => {
    service = createService();

    expect(service.getIsTopProject('project-id-1')).toBeNull();
    expect(service.getCompact('project-id-1')).toBeNull();
  });

  it('parses a single project with a single property from the URL', () => {
    routerMock.url = '/?customProjItems=project-id-2:(top:true)';
    service = createService();

    expect(service.getIsTopProject('project-id-2')).toBe(true);
    expect(service.getCompact('project-id-2')).toBeNull();
  });

  it('parses multiple projects with multiple properties from the URL', () => {
    routerMock.url =
      '/?customProjItems=project-id-2:(top:true);project-id-5:(compact:false);project-id-7:(top:false;compact:false)';
    service = createService();

    expect(service.getIsTopProject('project-id-2')).toBe(true);
    expect(service.getCompact('project-id-2')).toBeNull();

    expect(service.getIsTopProject('project-id-5')).toBeNull();
    expect(service.getCompact('project-id-5')).toBe(false);

    expect(service.getIsTopProject('project-id-7')).toBe(false);
    expect(service.getCompact('project-id-7')).toBe(false);
  });

  it('ignores projects not present in the URL', () => {
    routerMock.url = '/?customProjItems=project-id-2:(top:true)';
    service = createService();

    expect(service.getIsTopProject('unknown-project')).toBeNull();
    expect(service.getCompact('unknown-project')).toBeNull();
  });

  it('can set isTopProject explicitly and pushes the serialized param to the URL', () => {
    service = createService();
    service.setIsTopProject('project-id-2', true);

    expect(service.getIsTopProject('project-id-2')).toBe(true);
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      customProjItems: 'project-id-2:(top:true)',
    });
  });

  it('can set compact explicitly and pushes the serialized param to the URL', () => {
    service = createService();
    service.setCompact('project-id-5', false);

    expect(service.getCompact('project-id-5')).toBe(false);
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      customProjItems: 'project-id-5:(compact:false)',
    });
  });

  it('merges multiple set properties for the same project', () => {
    service = createService();
    service.setIsTopProject('project-id-7', false);
    service.setCompact('project-id-7', false);

    expect(service.getIsTopProject('project-id-7')).toBe(false);
    expect(service.getCompact('project-id-7')).toBe(false);
    expect(urlStateServiceMock.updateValue).toHaveBeenLastCalledWith({
      customProjItems: 'project-id-7:(top:false;compact:false)',
    });
  });

  it('preserves customizations of other projects when setting a new one', () => {
    routerMock.url = '/?customProjItems=project-id-2:(top:true)';
    service = createService();
    service.setCompact('project-id-5', false);

    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      customProjItems: 'project-id-2:(top:true);project-id-5:(compact:false)',
    });
  });

  it('serializes projects in stable project-id order independent of set order', () => {
    service = createService();
    service.setCompact('project-id-5', false);
    service.setIsTopProject('project-id-2', true);

    expect(urlStateServiceMock.updateValue).toHaveBeenLastCalledWith({
      customProjItems: 'project-id-2:(top:true);project-id-5:(compact:false)',
    });
  });

  it('does not update the URL when setting the same value again', () => {
    service = createService();
    service.setIsTopProject('project-id-2', true);
    urlStateServiceMock.updateValue.mockClear();

    service.setIsTopProject('project-id-2', true);

    expect(urlStateServiceMock.updateValue).not.toHaveBeenCalled();
  });

  it('removes isTopProject from URL when set to null', () => {
    service = createService();
    service.setIsTopProject('project-id-2', true);
    urlStateServiceMock.updateValue.mockClear();

    service.setIsTopProject('project-id-2', null);

    expect(service.getIsTopProject('project-id-2')).toBeNull();
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      customProjItems: null,
    });
  });

  it('removes compact from URL when set to null and keeps other project values', () => {
    service = createService();
    service.setCompact('project-id-2', false);
    service.setIsTopProject('project-id-5', true);
    urlStateServiceMock.updateValue.mockClear();

    service.setCompact('project-id-2', null);

    expect(service.getCompact('project-id-2')).toBeNull();
    expect(service.getIsTopProject('project-id-5')).toBe(true);
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      customProjItems: 'project-id-5:(top:true)',
    });
  });

  it('syncs customizations when the URL changes through navigation', () => {
    service = createService();
    routerMock.url = '/?customProjItems=project-id-2:(top:true)';
    routerMock.events.next(
      new NavigationEnd(1, routerMock.url, routerMock.url)
    );

    expect(service.getIsTopProject('project-id-2')).toBe(true);
  });
});
