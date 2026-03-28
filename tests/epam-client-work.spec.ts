import { test, expect } from '@playwright/test';

test('EPAM: Services -> Explore Our Client Work -> Client Work visible', async ({ page }) => {
  await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

  // Open Services from the header navigation
  // Use role-based locator to be resilient to layout changes.
  await page.getByRole('link', { name: /^Services$/ }).click();

  // Click "Explore Our Client Work" link
  await page.getByRole('link', { name: /Explore Our Client Work/i }).click();

  // Verify that "Client Work" text is visible
  await expect(page.getByText('Client Work', { exact: false })).toBeVisible();
});
