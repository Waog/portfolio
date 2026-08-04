import 'jest-expect-message';

import { TestBed } from '@angular/core/testing';
import {
  DefaultUrlSerializer,
  NavigationEnd,
  Router,
  UrlTree,
} from '@angular/router';
import { UrlStateService } from '@portfolio/url-state';
import { Subject } from 'rxjs';

import { CustomizationStateService } from './customization-state.service';

describe('CustomizationStateService', () => {
  let service: CustomizationStateService;
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
        CustomizationStateService,
        {
          provide: Router,
          useValue: routerMock,
        },
        {
          provide: UrlStateService,
          useValue: urlStateServiceMock,
        },
      ],
    });
  });

  function createService(): CustomizationStateService {
    return TestBed.inject(CustomizationStateService);
  }

  it('can create', () => {
    service = createService();
    expect(service).toBeInstanceOf(CustomizationStateService);
  });

  it('exposes isPanelShown as false by default', () => {
    service = createService();
    expect(service.isPanelShown()).toBe(false);
  });

  it('exposes isPrintMode as false by default', () => {
    service = createService();
    expect(service.isPrintMode()).toBe(false);
  });

  it('initializes isPanelShown from URL query params', () => {
    routerMock.url = '/?customizationPanelShown=true';
    service = createService();

    expect(service.isPanelShown()).toBe(true);
  });

  it('initializes isPrintMode from URL query params', () => {
    routerMock.url = '/?printMode=true';
    service = createService();

    expect(service.isPrintMode()).toBe(true);
  });

  it('can set isPanelShown explicitly', () => {
    service = createService();
    service.setPanelShown(true);

    expect(service.isPanelShown()).toBe(true);
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      customizationPanelShown: 'true',
    });

    service.setPanelShown(false);

    expect(service.isPanelShown()).toBe(false);
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      customizationPanelShown: null,
    });
  });

  it('can toggle isPanelShown', () => {
    service = createService();
    service.togglePanelShown();

    expect(service.isPanelShown()).toBe(true);
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      customizationPanelShown: 'true',
    });

    service.togglePanelShown();

    expect(service.isPanelShown()).toBe(false);
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      customizationPanelShown: null,
    });
  });

  it('can set isPrintMode explicitly', () => {
    service = createService();
    service.setPrintMode(true);

    expect(service.isPrintMode()).toBe(true);
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      printMode: 'true',
    });

    service.setPrintMode(false);

    expect(service.isPrintMode()).toBe(false);
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      printMode: null,
    });
  });

  it('can toggle isPrintMode', () => {
    service = createService();
    service.togglePrintMode();

    expect(service.isPrintMode()).toBe(true);
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      printMode: 'true',
    });

    service.togglePrintMode();

    expect(service.isPrintMode()).toBe(false);
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      printMode: null,
    });
  });

  it('syncs panel state when URL changes through navigation', () => {
    service = createService();
    routerMock.url = '/?customizationPanelShown=true';
    routerMock.events.next(
      new NavigationEnd(1, routerMock.url, routerMock.url)
    );

    expect(service.isPanelShown()).toBe(true);
  });

  it('syncs print mode when URL changes through navigation', () => {
    service = createService();
    routerMock.url = '/?printMode=true';
    routerMock.events.next(
      new NavigationEnd(1, routerMock.url, routerMock.url)
    );

    expect(service.isPrintMode()).toBe(true);
  });

  it('exposes skillMatrixExperienceUnit as project-count by default', () => {
    service = createService();
    expect(service.skillMatrixExperienceUnit()).toBe('project-count');
  });

  it('initializes skillMatrixExperienceUnit from URL query params', () => {
    routerMock.url = '/?skillMatrixExperienceUnit=time';
    service = createService();

    expect(service.skillMatrixExperienceUnit()).toBe('time');
  });

  it('can set skillMatrixExperienceUnit explicitly', () => {
    service = createService();
    service.setSkillMatrixExperienceUnit('time');

    expect(service.skillMatrixExperienceUnit()).toBe('time');
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      skillMatrixExperienceUnit: 'time',
    });

    service.setSkillMatrixExperienceUnit('project-count');

    expect(service.skillMatrixExperienceUnit()).toBe('project-count');
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      skillMatrixExperienceUnit: null,
    });
  });

  it('does not update URL when setting skillMatrixExperienceUnit to same value', () => {
    service = createService();
    service.setSkillMatrixExperienceUnit('project-count');

    expect(urlStateServiceMock.updateValue).not.toHaveBeenCalled();
  });

  it('syncs skillMatrixExperienceUnit when URL changes through navigation', () => {
    service = createService();
    routerMock.url = '/?skillMatrixExperienceUnit=time';
    routerMock.events.next(
      new NavigationEnd(1, routerMock.url, routerMock.url)
    );

    expect(service.skillMatrixExperienceUnit()).toBe('time');
  });

  it('exposes projectSortOrder as relevance by default', () => {
    service = createService();
    expect(service.projectSortOrder()).toBe('relevance');
  });

  it('initializes projectSortOrder from URL query params', () => {
    routerMock.url = '/?projectSortOrder=date';
    service = createService();

    expect(service.projectSortOrder()).toBe('date');
  });

  it('can set projectSortOrder explicitly', () => {
    service = createService();
    service.setProjectSortOrder('date');

    expect(service.projectSortOrder()).toBe('date');
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      projectSortOrder: 'date',
    });

    service.setProjectSortOrder('relevance');

    expect(service.projectSortOrder()).toBe('relevance');
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      projectSortOrder: null,
    });
  });

  it('does not update URL when setting projectSortOrder to same value', () => {
    service = createService();
    service.setProjectSortOrder('relevance');

    expect(urlStateServiceMock.updateValue).not.toHaveBeenCalled();
  });

  it('syncs projectSortOrder when URL changes through navigation', () => {
    service = createService();
    routerMock.url = '/?projectSortOrder=date';
    routerMock.events.next(
      new NavigationEnd(1, routerMock.url, routerMock.url)
    );

    expect(service.projectSortOrder()).toBe('date');
  });

  it('exposes printProjectPageSizes as [3, 5] by default', () => {
    service = createService();
    expect(service.printProjectPageSizes()).toEqual([3, 5]);
  });

  it('exposes printProjectPageStarts computed from page sizes', () => {
    service = createService();
    expect(service.printProjectPageStarts()).toEqual([0, 3]);
  });

  it('initializes printProjectPageSizes from URL query params', () => {
    routerMock.url = '/?printProjectPageSizes=2,4,10';
    service = createService();

    expect(service.printProjectPageSizes()).toEqual([2, 4, 10]);
    expect(service.printProjectPageStarts()).toEqual([0, 2, 6]);
  });

  it('ignores or sanitizes invalid entries when parsing printProjectPageSizes from URL', () => {
    routerMock.url = '/?printProjectPageSizes=2,abc,-1,0,4.6';
    service = createService();

    expect(service.printProjectPageSizes()).toEqual([2, 1, 1, 4]);
  });

  it('falls back to defaults if printProjectPageSizes URL param has no valid entries', () => {
    routerMock.url = '/?printProjectPageSizes=abc,xyz';
    service = createService();

    expect(service.printProjectPageSizes()).toEqual([3, 5]);
  });

  it('can set printProjectPageSizes explicitly', () => {
    service = createService();
    service.setPrintProjectPageSizes([2, 4, 10]);

    expect(service.printProjectPageSizes()).toEqual([2, 4, 10]);
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      printProjectPageSizes: '2,4,10',
    });

    service.setPrintProjectPageSizes([3, 5]);

    expect(service.printProjectPageSizes()).toEqual([3, 5]);
    expect(urlStateServiceMock.updateValue).toHaveBeenCalledWith({
      printProjectPageSizes: null,
    });
  });

  it('does not update URL when setting printProjectPageSizes to same value', () => {
    service = createService();
    service.setPrintProjectPageSizes([3, 5]);

    expect(urlStateServiceMock.updateValue).not.toHaveBeenCalled();
  });

  it('can add a print project page with a default size', () => {
    service = createService();
    service.addPrintProjectPage();

    expect(service.printProjectPageSizes()).toEqual([3, 5, 5]);
  });

  it('can remove a print project page by index', () => {
    service = createService();
    service.setPrintProjectPageSizes([2, 4, 10]);
    service.removePrintProjectPage(1);

    expect(service.printProjectPageSizes()).toEqual([2, 10]);
  });

  it('does not remove the last remaining print project page', () => {
    service = createService();
    service.setPrintProjectPageSizes([3]);
    service.removePrintProjectPage(0);

    expect(service.printProjectPageSizes()).toEqual([3]);
  });

  it('can set the size of a specific print project page', () => {
    service = createService();
    service.setPrintProjectPageSize(0, 2);

    expect(service.printProjectPageSizes()).toEqual([2, 5]);
  });

  it('sanitizes invalid values when setting a print project page size', () => {
    service = createService();
    service.setPrintProjectPageSize(0, -3);

    expect(service.printProjectPageSizes()).toEqual([1, 5]);
  });

  it('syncs printProjectPageSizes when URL changes through navigation', () => {
    service = createService();
    routerMock.url = '/?printProjectPageSizes=2,4,10';
    routerMock.events.next(
      new NavigationEnd(1, routerMock.url, routerMock.url)
    );

    expect(service.printProjectPageSizes()).toEqual([2, 4, 10]);
    expect(service.printProjectPageStarts()).toEqual([0, 2, 6]);
  });
});
