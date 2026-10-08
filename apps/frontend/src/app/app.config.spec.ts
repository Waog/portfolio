import { TestBed } from '@angular/core/testing';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { vi } from 'vitest';

import { appConfig } from './app.config';

describe('Application skeleton loader configuration', () => {
  it('renders skeletons without invalid CSS style bindings', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    try {
      TestBed.configureTestingModule({
        imports: [NgxSkeletonLoaderComponent],
        providers: appConfig.providers,
      });
      const fixture = TestBed.createComponent(NgxSkeletonLoaderComponent);
      fixture.detectChanges();

      expect(
        fixture.nativeElement.querySelector('.skeleton-loader')
      ).toBeTruthy();
      expect(
        warn.mock.calls.some(([message]) => String(message).includes('NG0318'))
      ).toBe(false);
    } finally {
      warn.mockRestore();
    }
  });
});
