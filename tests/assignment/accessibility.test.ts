import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Store Page Accessibility', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page: browserPage }) => {
    // Go to the store page
    await browserPage.goto('https://hoff.is/store2/');

    // Run accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page: browserPage }).analyze();

    // Assert that there are no violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
