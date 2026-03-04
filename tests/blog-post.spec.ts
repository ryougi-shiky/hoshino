import { test, expect } from "@playwright/test";

test.describe("Blog post page", () => {
  test("renders the Milky Way guide post", async ({ page }) => {
    await page.goto("/blog/chasing-the-milky-way");

    await expect(
      page.getByRole("heading", { name: /Chasing the Milky Way/i })
    ).toBeVisible();

    await expect(page.getByText(/astrophotography/i).first()).toBeVisible();
  });

  test("displays author and date metadata", async ({ page }) => {
    await page.goto("/blog/chasing-the-milky-way");

    await expect(page.getByText("Hoshino", { exact: true })).toBeVisible();
    // The date is rendered in a <time> element
    await expect(page.locator("time")).toBeVisible();
  });

  test("has a 'Back to Blog' link", async ({ page }) => {
    await page.goto("/blog/chasing-the-milky-way");

    const backLink = page.getByRole("link", { name: /back to blog/i });
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL("/blog");
  });

  test("returns 404 for a non-existent slug", async ({ page }) => {
    const response = await page.goto("/blog/this-does-not-exist");
    expect(response?.status()).toBe(404);
  });
});
