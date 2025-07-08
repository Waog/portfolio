import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { ChipSpacing } from './color-chip.component';

export interface ColorChipInputs {
  text: string;
  icon?: string;
  spacing?: ChipSpacing;
  showCloseButton?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ColorChipDimensionsService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  getWidth(colorChipInputs: ColorChipInputs): number {
    const textWidth = this.getTextWidth(colorChipInputs.text);

    const { spacing } = colorChipInputs;
    const paddingLeft = spacing === 'small' ? 4 : spacing === 'large' ? 12 : 8;
    const paddingRight = paddingLeft;

    const border = 1 * 2;
    const iconWidth = colorChipInputs.icon
      ? 16 /* icon width */ + 4 /* gap */
      : 0;

    const closeButtonWidth = colorChipInputs.showCloseButton
      ? 26 /* close button width + gap +/- magical margins */
      : 0;

    return Math.ceil(
      textWidth +
        paddingLeft +
        paddingRight +
        border +
        iconWidth +
        closeButtonWidth
    );
  }

  private getTextWidth(text: string): number {
    if (isPlatformServer(this.platformId)) {
      // Fallback for SSR or environments without document
      return text.length * 8;
    }

    const fontSizePx = 14;
    const fontWeight = 500;
    const fontFamily = 'Roboto, Arial, sans-serif';
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return 0;
    context.font = `${fontWeight} ${fontSizePx}px ${fontFamily}`;
    return context.measureText(text).width;
  }
}
