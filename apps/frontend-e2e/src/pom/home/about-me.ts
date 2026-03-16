import { Locator, type Page } from '@playwright/test';

export class AboutMe {
  readonly locator: Locator;

  readonly hero: Locator;
  readonly heroProfileImage: Locator;
  readonly heroName: Locator;
  readonly heroRole: Locator;
  readonly heroLocation: Locator;
  readonly heroSummary: Locator;

  readonly personalInfo: Locator;
  readonly personalInfoTitle: Locator;
  readonly personalInfoBirthYear: Locator;
  readonly personalInfoLanguageChips: Locator;

  readonly education: Locator;
  readonly educationTitle: Locator;

  readonly communityAndWriting: Locator;
  readonly communityAndWritingTitle: Locator;

  readonly professionalFocus: Locator;
  readonly professionalFocusTitle: Locator;

  private static readonly CARD_TITLE_SELECTOR =
    '.section-title span[slot="title"]';

  constructor(private page: Page) {
    this.locator = page.locator('lib-section.about-me');

    this.hero = this.locator.locator('lib-hero-content');
    this.heroProfileImage = this.hero.getByRole('img', {
      name: 'Oliver Stadie Profile Photo',
    });
    this.heroName = this.hero.getByRole('heading', { name: 'Oliver Stadie' });
    this.heroRole = this.hero.locator('mat-chip');
    this.heroLocation = this.hero.locator('.location-item span');
    this.heroSummary = this.hero.locator('.hero-summary');

    this.personalInfo = this.locator.locator('lib-personal-information');
    this.personalInfoTitle = this.personalInfo.locator(
      AboutMe.CARD_TITLE_SELECTOR
    );
    this.personalInfoBirthYear = this.personalInfo.getByText('1984');
    this.personalInfoLanguageChips = this.personalInfo.locator(
      '.language-list lib-color-chip'
    );

    this.education = this.locator.locator('lib-education');
    this.educationTitle = this.education.locator(AboutMe.CARD_TITLE_SELECTOR);

    this.communityAndWriting = this.locator.locator('lib-community-writing');
    this.communityAndWritingTitle = this.communityAndWriting.locator(
      AboutMe.CARD_TITLE_SELECTOR
    );

    this.professionalFocus = this.locator.locator('lib-professional-focus');
    this.professionalFocusTitle = this.professionalFocus.locator(
      AboutMe.CARD_TITLE_SELECTOR
    );
  }

  public personalInfoLanguageChip(language: string): Locator {
    return this.personalInfoLanguageChips.getByText(language);
  }
}
