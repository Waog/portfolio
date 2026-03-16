import { expect, test } from '../fixtures/app.fixture';

test('adding two search terms works', async ({ homePage }) => {
  const tagInput = homePage.tagInput();

  await tagInput.addSearchTerm('Angular');
  await expect(tagInput.chips).toHaveCount(1);
  await expect(tagInput.chipTexts.last()).toHaveText('Angular');
  expect(homePage.searchTerms()).toEqual(['Angular']);

  await tagInput.addSearchTerm('CSS');
  await expect(tagInput.chips).toHaveCount(2);
  await expect(tagInput.chipTexts.last()).toHaveText('CSS');
  expect(homePage.searchTerms()).toEqual(['Angular', 'CSS']);
});
