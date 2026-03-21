import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  type Data,
  RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';

import { WEB_METADATA } from './web-metadata.content';
import {
  type WebMetadataRouteData,
  type WebMetadataValues,
} from './web-metadata.types';

@Injectable({ providedIn: 'root' })
export class WebMetadataTitleStrategy extends TitleStrategy {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  public override updateTitle(routerState: RouterStateSnapshot): void {
    const routeTitle =
      super.buildTitle(routerState) ?? WEB_METADATA.defaults.title;
    const activeRoute = this.getDeepestRoute(routerState.root);

    this.title.setTitle(routeTitle);
    this.applyFromRouteSnapshot(
      activeRoute,
      routeTitle,
      routerState.url || '/'
    );
  }

  private applyFromRouteSnapshot(
    activeRoute: ActivatedRouteSnapshot,
    pageTitle: string,
    routeUrl: string
  ): void {
    const webMetadata = this.readWebMetadata(activeRoute.data);
    const canonicalPath = this.getCanonicalPath(routeUrl);
    const ogUrl = this.toAbsoluteUrl(canonicalPath);
    const ogImage = this.toAbsoluteUrl(
      webMetadata.imagePath ?? WEB_METADATA.defaults.imagePath
    );

    this.updateOpenGraphTag(
      'og:description',
      webMetadata.description ?? WEB_METADATA.defaults.description
    );
    this.updateOpenGraphTag('og:image', ogImage);
    this.updateOpenGraphTag('og:image:width', WEB_METADATA.defaults.imageWidth);
    this.updateOpenGraphTag(
      'og:image:height',
      WEB_METADATA.defaults.imageHeight
    );
    this.updateOpenGraphTag('og:image:alt', WEB_METADATA.defaults.imageAlt);
    this.updateOpenGraphTag('og:site_name', WEB_METADATA.defaults.siteName);
    this.updateOpenGraphTag('og:title', pageTitle);
    this.updateOpenGraphTag(
      'og:type',
      webMetadata.type ?? WEB_METADATA.defaults.type
    );
    this.updateOpenGraphTag('og:url', ogUrl);
    this.updateCanonicalLink(ogUrl);
    this.updateMetaDescription(
      webMetadata.description ?? WEB_METADATA.defaults.description
    );
  }

  private getCanonicalPath(currentUrl: string): string {
    const withoutQuery = currentUrl.split('?')[0] || '/';
    const withoutFragment = withoutQuery.split('#')[0] || '/';

    return withoutFragment.startsWith('/')
      ? withoutFragment
      : `/${withoutFragment}`;
  }

  private getDeepestRoute(
    snapshot: ActivatedRouteSnapshot
  ): ActivatedRouteSnapshot {
    let activeRoute = snapshot;

    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }

    return activeRoute;
  }

  private readWebMetadata(data: Data): WebMetadataValues {
    const routeData = data as WebMetadataRouteData;

    return routeData.webMetadata ?? {};
  }

  private toAbsoluteUrl(pathOrUrl: string): string {
    return new URL(pathOrUrl, this.getSiteOrigin()).toString();
  }

  private getSiteOrigin(): string {
    const href = this.document.location?.href;

    if (!href || href === 'null') {
      return WEB_METADATA.defaults.siteOrigin;
    }

    try {
      const origin = new URL(href).origin;

      if (!origin || origin === 'null') {
        return WEB_METADATA.defaults.siteOrigin;
      }

      return origin;
    } catch {
      return WEB_METADATA.defaults.siteOrigin;
    }
  }

  private updateOpenGraphTag(property: string, content: string): void {
    this.meta.updateTag({ property, content }, `property="${property}"`);
  }

  private updateCanonicalLink(url: string): void {
    const head = this.document.head;
    let canonicalElement = head.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonicalElement) {
      canonicalElement = this.document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      head.appendChild(canonicalElement);
    }

    canonicalElement.setAttribute('href', url);
  }

  private updateMetaDescription(content: string): void {
    this.meta.updateTag({ name: 'description', content });
  }
}
