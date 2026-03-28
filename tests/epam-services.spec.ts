import { test, expect } from '@playwright/test';

/**
 * Test Suite: EPAM Services Navigation
 *
 * Scenario:
 *  1. Navigate to https://www.epam.com/
 *  2. Select "Services" from the header menu
 *  3. Click the "Explore Our Client Work" link
 *  4. Verify that the "Client Work" text is visible on the page
 */

test.describe('EPAM Services Navigation', () => {

  test('should navigate to Client Work page via Services menu', async ({ page }) => {

    // Step 1: Navigate to the EPAM homepage
    await page.goto('https://www.epam.com/');
    await expect(page).toHaveURL('https://www.epam.com/');

    // Step 2: Select "Services" from the header menu
    const servicesMenu = page.locator('header nav a, header nav span, header nav button').filter({ hasText: 'Services' }).first();
    await servicesMenu.waitFor({ state: 'visible' });
    await servicesMenu.click();

    // Step 3: Click the "Explore Our Client Work" link
    const exploreClientWorkLink = page.getByRole('link', { name: /Explore Our Client Work/i });
    await exploreClientWorkLink.waitFor({ state: 'visible' });
    await exploreClientWorkLink.click();

    // Step 4: Verify that the "Client Work" text is visible on the page
    await expect(page.getByText(/Client Work/i).first()).toBeVisible();
  });

});
