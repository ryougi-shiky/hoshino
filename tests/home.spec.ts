import { test, expect } from "@playwright/test";

test.describe("Photo journal", () => {
  test("displays site name and photos", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: "✦ 星野 Hoshino" })).toBeVisible();
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("photos have captions and dates", async ({ page }) => {
    await page.goto("/");

    const firstArticle = page.locator("article").first();
    await expect(firstArticle.locator("img")).toBeVisible();
    await expect(firstArticle).toContainText(/\w/);
  });

  test("theme switcher is present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByLabel("Choose color theme")).toBeVisible();
  });
});
