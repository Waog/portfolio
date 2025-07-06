import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import type { Meta } from '@storybook/angular';

// Default export for CSF compliance
export default {
  title: 'Utilities/Media Wrapper',
  includeStories: ['Docs'],
} as Meta;

@Component({
  selector: 'lib-media-wrapper',
  template: '<ng-content></ng-content>',
  standalone: true,
})
export class MediaWrapperComponent implements AfterViewInit {
  @Input() media: 'screen' | 'print' = 'screen';

  constructor(private host: ElementRef) {}

  ngAfterViewInit(): void {
    this.simulateMedia(this.media);
  }

  private simulateMedia(media: 'screen' | 'print') {
    const styleSheets = Array.from(document.styleSheets) as CSSStyleSheet[];
    const printRules: CSSMediaRule[] = [];
    const screenRules: CSSMediaRule[] = [];
    const disabledRules: CSSMediaRule[] = [];

    for (const sheet of styleSheets) {
      let rules: CSSRuleList;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      if (!rules) continue;
      for (const rule of Array.from(rules)) {
        if (rule.constructor.name === 'CSSMediaRule') {
          const mediaRule = rule as CSSMediaRule;
          const condition =
            (mediaRule as any).conditionText || mediaRule.media.mediaText;
          if (condition.includes('screen')) {
            screenRules.push(mediaRule);
          } else if (condition.includes('print')) {
            printRules.push(mediaRule);
          } else if (mediaRule.media.mediaText === 'disabled') {
            disabledRules.push(mediaRule);
          }
        }
      }
    }

    if (media === 'print') {
      this.replaceInAllRules(screenRules, 'disabled');
      this.replaceInAllRules(printRules, 'screen');
    } else {
      this.replaceInAllRules(screenRules, 'screen');
      this.replaceInAllRules(printRules, 'print');
    }
  }

  private replaceInAllRules(rules: CSSMediaRule[], replacement: string) {
    for (const rule of rules) {
      try {
        rule.media.mediaText = replacement;
      } catch {}
    }
  }
}
