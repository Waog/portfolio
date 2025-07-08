import { Injectable } from '@angular/core';

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
  getWidth(colorChipInputs: ColorChipInputs): number {
    const fontSizePx = 14;
    const fontWeight = 500;
    const fontFamily = 'Roboto, Arial, sans-serif';
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return 0;
    context.font = `${fontWeight} ${fontSizePx}px ${fontFamily}`;
    const textWidth = context.measureText(colorChipInputs.text).width;

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
}
