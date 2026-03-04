import { test, expect } from "@playwright/test";

test.describe("Gallery page", () => {
  test("displays the Gallery heading", async ({ page }) => {
    await page.goto("/gallery");

    await expect(page.getByRole("heading", { name: "Gallery" })).toBeVisible();
  });

  test("shows photo count in the description", async ({ page }) => {
    await page.goto("/gallery");

    await expect(page.getByText(/photographs from across the globe/i)).toBeVisible();
  });

  test("renders photo images", async ({ page }) => {
    await page.goto("/gallery");

    const images = page.locator("img");
    await expect(images.first()).toBeVisible();
  });
});
