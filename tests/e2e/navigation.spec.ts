import { expect, test } from "@playwright/test";

test("home to project and writing flow", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText(/portfolio-first knowledge hub/i)).toBeVisible();

  await page.getByRole("link", { name: /projeleri incele/i }).click();
  await expect(page).toHaveURL(/\/projects/);

  await page.getByRole("link", { name: /realtime observability dashboard/i }).first().click();
  await expect(page).toHaveURL(/\/projects\/realtime-observability-dashboard/);

  await page.goto("/writing");
  await page.getByRole("link", { name: /next.js app router'da clean architecture sınırları/i }).first().click();
  await expect(page).toHaveURL(/\/writing\/clean-architecture-on-nextjs/);
});

test("tag page shows mixed content", async ({ page }) => {
  await page.goto("/tags/nextjs");
  await expect(page.getByText(/tag view/i)).toBeVisible();
  await expect(page.getByRole("article").first()).toBeVisible();
});

test("mobile navigation for filter visibility", async ({ page }) => {
  await page.goto("/bookmarks");
  await expect(page.getByPlaceholder(/ara:/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /filtrele/i })).toBeVisible();
});
