import { test, expect } from "@playwright/test";

test.describe("Blog listing page", () => {
  test("displays the Blog heading", async ({ page }) => {
    await page.goto("/blog");

    await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();
  });

  test("lists blog post cards", async ({ page }) => {
    await page.goto("/blog");

    // At least one post exists in content/posts
    const cards = page.locator("a[href^='/blog/']");
    await expect(cards.first()).toBeVisible();
  });

  test("clicking a post card navigates to the post", async ({ page }) => {
    await page.goto("/blog");

    const firstPostLink = page.locator("a[href^='/blog/']").first();
    const href = await firstPostLink.getAttribute("href");
    await firstPostLink.click();

    await expect(page).toHaveURL(href!);
    await expect(page.getByRole("heading").first()).toBeVisible();
  });
});
