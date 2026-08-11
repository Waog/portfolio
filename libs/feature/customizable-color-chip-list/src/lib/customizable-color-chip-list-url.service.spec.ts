import { TestBed } from '@angular/core/testing';
import {
  DefaultUrlSerializer,
  NavigationEnd,
  Router,
  UrlTree,
} from '@angular/router';
import { UrlStateService } from '@portfolio/url-state';
import { Subject } from 'rxjs';

import { CustomizableColorChipListUrlService } from './customizable-color-chip-list-url.service';

describe('CustomizableColorChipListUrlService', () => {
  let service: CustomizableColorChipListUrlService;
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
        CustomizableColorChipListUrlService,
        { provide: Router, useValue: routerMock },
        { provide: UrlStateService, useValue: urlStateServiceMock },
      ],
    });
  });

  function createService(): CustomizableColorChipListUrlService {
    return TestBed.inject(CustomizableColorChipListUrlService);
  }

  it('can create', () => {
    service = createService();
    expect(service).toBeInstanceOf(CustomizableColorChipListUrlService);
  });

  it('returns null for spacing and rows by default', () => {
    service = createService();

    expect(service.getSpacing('project-id-1')).toBeNull();
    expect(service.getRows('project-id-1')).toBeNull();
  });

  it('parses a single component with a single property from the URL', () => {
    routerMock.url = '/?customColorChipLists=project-id-2:(spacing:small)';
    service = createService();

    expect(service.getSpacing('project-id-2')).toBe('small');
    expect(service.getRows('project-id-2')).toBeNull();
  });

  it('parses multiple components with multiple properties from the URL', () => {
    routerMock.url =
      '/?customColorChipLists=project-id-2:(spacing:small);project-id-5:(rows:3);project-id-7:(spacing:medium;rows:4)';
    service = createService();

    expect(service.getSpacing('project-id-2')).toBe('small');
    expect(service.getRows('project-id-2')).toBeNull();

    expect(service.getSpacing('project-id-5')).toBeNull();
    expect(service.getRows('project-id-5')).toBe(3);

    expect(service.getSpacing('project-id-7')).toBe('medium');
    expect(service.getRows('project-id-7')).toBe(4);
  });

  it('ignores entries without a recognized customization', () => {
    routerMock.url = '/?customColorChipLists=project-id-2:(unknown:value)';
    service = createService();

    expect(service.getSpacing('project-id-2')).toBeNull();
    expect(service.getRows('project-id-2')).toBeNull();
  });

  it('can set spacing explicitly and pushes the serialized param to the URL', () => {
    service = createService();
    service.setSpacing('project-id-2', 'small');

    expect(service.getSpacing('project-id-2')).toBe('small');
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      customColorChipLists: 'project-id-2:(spacing:small)',
    });
  });

  it('can set rows explicitly and pushes the serialized param to the URL', () => {
    service = createService();
    service.setRows('project-id-5', 3);

    expect(service.getRows('project-id-5')).toBe(3);
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      customColorChipLists: 'project-id-5:(rows:3)',
    });
  });

  it('merges multiple set properties for the same component', () => {
    service = createService();
    service.setSpacing('project-id-7', 'large');
    service.setRows('project-id-7', 4);

    expect(service.getSpacing('project-id-7')).toBe('large');
    expect(service.getRows('project-id-7')).toBe(4);
    expect(urlStateServiceMock.updateValue).toHaveBeenLastCalledWith({
      customColorChipLists: 'project-id-7:(spacing:large;rows:4)',
    });
  });

  it('preserves customizations of other components when setting a new one', () => {
    routerMock.url = '/?customColorChipLists=project-id-2:(spacing:small)';
    service = createService();
    service.setRows('project-id-5', 3);

    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      customColorChipLists:
        'project-id-2:(spacing:small);project-id-5:(rows:3)',
    });
  });

  it('serializes components in stable key order independent of set order', () => {
    service = createService();
    service.setRows('project-id-5', 3);
    service.setSpacing('project-id-2', 'small');

    expect(urlStateServiceMock.updateValue).toHaveBeenLastCalledWith({
      customColorChipLists:
        'project-id-2:(spacing:small);project-id-5:(rows:3)',
    });
  });

  it('does not update the URL when setting the same value again', () => {
    service = createService();
    service.setSpacing('project-id-2', 'small');
    urlStateServiceMock.updateValue.mockClear();

    service.setSpacing('project-id-2', 'small');

    expect(urlStateServiceMock.updateValue).not.toHaveBeenCalled();
  });

  it('removes spacing from URL when set to null', () => {
    service = createService();
    service.setSpacing('project-id-2', 'small');
    urlStateServiceMock.updateValue.mockClear();

    service.setSpacing('project-id-2', null);

    expect(service.getSpacing('project-id-2')).toBeNull();
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      customColorChipLists: null,
    });
  });

  it('removes rows from URL when set to null and keeps other component values', () => {
    service = createService();
    service.setRows('project-id-2', 3);
    service.setSpacing('project-id-5', 'medium');
    urlStateServiceMock.updateValue.mockClear();

    service.setRows('project-id-2', null);

    expect(service.getRows('project-id-2')).toBeNull();
    expect(service.getSpacing('project-id-5')).toBe('medium');
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      customColorChipLists: 'project-id-5:(spacing:medium)',
    });
  });

  it('syncs customizations when the URL changes through navigation', () => {
    service = createService();
    routerMock.url =
      '/?customColorChipLists=project-id-2:(spacing:small;rows:3)';
    routerMock.events.next(
      new NavigationEnd(1, routerMock.url, routerMock.url)
    );

    expect(service.getSpacing('project-id-2')).toBe('small');
    expect(service.getRows('project-id-2')).toBe(3);
  });
});
