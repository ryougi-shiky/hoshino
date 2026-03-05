import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("displays the site heading and hero text", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /Hoshino/i })).toBeVisible();
    await expect(page.getByText("✦ Night Sky Photography")).toBeVisible();
  });

  test("navigation links are present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: "Gallery" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Blog" }).first()).toBeVisible();
  });

  test("hero CTA buttons navigate correctly", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "View Gallery" }).click();
    await expect(page).toHaveURL("/gallery");

    await page.goBack();
    await page.getByRole("link", { name: "Read Blog" }).click();
    await expect(page).toHaveURL("/blog");
  });

  test("featured photos section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Featured Shots")).toBeVisible();
  });

  test("recent blog posts section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("From the Blog")).toBeVisible();
  });
});
