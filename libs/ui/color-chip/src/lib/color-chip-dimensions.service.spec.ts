import { TestBed } from '@angular/core/testing';
import { createCanvas } from 'canvas';

import { ColorChipDimensionsService } from './color-chip-dimensions.service';

describe('ColorChipDimensionsService', () => {
  let service: ColorChipDimensionsService;
  let origCreateElement: typeof global.document.createElement;

  beforeEach(() => {
    origCreateElement = global.document.createElement;
    global.document.createElement = function (tagName: string): HTMLElement {
      if (tagName === 'canvas') {
        // node-canvas returns a Canvas instance with getContext('2d')
        return createCanvas(0, 0) as unknown as HTMLElement;
      }
      return origCreateElement.call(this, tagName);
    };

    TestBed.configureTestingModule({
      providers: [ColorChipDimensionsService],
    });
    service = TestBed.inject(ColorChipDimensionsService);
  });

  afterEach(() => {
    global.document.createElement = origCreateElement;
  });

  it('should create', async () => {
    expect(service).toBeTruthy();
  });

  it('should take actual letter width into account', async () => {
    const narrowText = 'i';
    const wideText = 'm';

    const calculatedNarrowWidth = service.getWidth({ text: narrowText });
    const calculatedWideWidth = service.getWidth({ text: wideText });
    expect(calculatedNarrowWidth).toBeGreaterThan(0);
    expect(calculatedWideWidth).toBeGreaterThan(0);
    expect(calculatedWideWidth).toBeGreaterThan(calculatedNarrowWidth);
  });

  it('should return a greater width when icon is present', async () => {
    const text = 'Test';
    const widthWithoutIcon = service.getWidth({ text });
    const widthWithIcon = service.getWidth({ text, icon: 'star' });
    expect(widthWithoutIcon).toBeGreaterThan(0);
    expect(widthWithIcon).toBeGreaterThan(0);
    expect(widthWithIcon).toBeGreaterThan(widthWithoutIcon);
  });

  it('should return a greater width when close button is present', async () => {
    const text = 'Test';
    const widthWithoutBtn = service.getWidth({ text });
    const widthWithBtn = service.getWidth({ text, showCloseButton: true });
    expect(widthWithoutBtn).toBeGreaterThan(0);
    expect(widthWithBtn).toBeGreaterThan(0);
    expect(widthWithBtn).toBeGreaterThan(widthWithoutBtn);
  });

  it('should return a different width for different spacings', async () => {
    const text = 'Test';
    const widthWithoutSpacing = service.getWidth({ text });
    const widthWithSmall = service.getWidth({ text, spacing: 'small' });
    const widthWithMedium = service.getWidth({ text, spacing: 'medium' });
    const widthWithLarge = service.getWidth({ text, spacing: 'large' });

    expect(widthWithoutSpacing).toBeGreaterThan(0);
    expect(widthWithSmall).toBeGreaterThan(0);
    expect(widthWithMedium).toBeGreaterThan(0);
    expect(widthWithLarge).toBeGreaterThan(0);

    expect(widthWithoutSpacing).toEqual(widthWithMedium);

    expect(widthWithSmall).toBeLessThan(widthWithMedium);
    expect(widthWithMedium).toBeLessThan(widthWithLarge);
  });
});
