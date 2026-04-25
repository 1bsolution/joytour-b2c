import { test, expect } from "@playwright/test";

test("home page renders hero and featured tours", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /find tours/i })).toBeVisible();
});
