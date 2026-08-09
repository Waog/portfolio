import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WEB_METADATA } from '@portfolio/web-metadata';

@Injectable({
  providedIn: 'root',
})
export class HeroHiddenLinkService {
  private static readonly PANEL_QUERY_PARAM = 'customizationPanelShown';

  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  getHiddenLinkUrl(): string {
    const currentUrl = this.getCurrentUrl();

    currentUrl.searchParams.delete(HeroHiddenLinkService.PANEL_QUERY_PARAM);
    currentUrl.hash = '';

    if (this.isLocalhost(currentUrl.hostname)) {
      this.replaceOriginWithPublicSiteOrigin(currentUrl);
    }

    return currentUrl.toString();
  }

  private getCurrentUrl(): URL {
    const href = this.document.location?.href;

    if (href && href !== 'null') {
      try {
        return new URL(href);
      } catch {
        return this.createAbsoluteUrlFromRouterUrl();
      }
    }

    return this.createAbsoluteUrlFromRouterUrl();
  }

  private createAbsoluteUrlFromRouterUrl(): URL {
    return new URL(this.router.url || '/', WEB_METADATA.defaults.siteOrigin);
  }

  private replaceOriginWithPublicSiteOrigin(url: URL): void {
    const publicOrigin = new URL(WEB_METADATA.defaults.siteOrigin);

    url.protocol = publicOrigin.protocol;
    url.hostname = publicOrigin.hostname;
    url.port = publicOrigin.port;
  }

  private isLocalhost(hostname: string): boolean {
    return (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '[::1]'
    );
  }
}
