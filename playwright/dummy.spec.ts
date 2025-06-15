import { expect, test } from '@playwright/test';

test('HP has heading', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 2 })).toBeDefined();
});

test('load articles page', async ({ page }) => {
	await page.goto('/');

	await page.getByRole('link', { name: 'Articles' }).click();

	await expect(page.getByTestId('articles-section')).toBeDefined();
});
