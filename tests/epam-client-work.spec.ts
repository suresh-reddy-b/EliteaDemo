import { test, expect } from '@playwright/test';

test('EPAM: navigate via Services -> Explore Our Client Work and verify Client Work text', async ({ page }) => {
  await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

  // Open Services menu from header
  const servicesNav = page.getByRole('navigation').getByRole('link', { name: /^Services$/i });
  await expect(servicesNav).toBeVisible();
  await servicesNav.hover();

  // Some viewports require a click instead of hover; attempt click if submenu not visible.
  const exploreClientWorkLink = page.getByRole('link', { name: /Explore Our Client Work/i }).first();
  if (!(await exploreClientWorkLink.isVisible().catch(() => false))) {
    await servicesNav.click();
  }

  await expect(exploreClientWorkLink).toBeVisible();
  await exploreClientWorkLink.click();

  // Verify Client Work text is visible on the destination page
  await expect(page.getByText('Client Work', { exact: false })).toBeVisible();
});
