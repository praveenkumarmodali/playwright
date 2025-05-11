const { test, expect } = require("@playwright/test");

test("page playwright test", async function ({ page }) {
  await page.goto("http://www.google.com");
  const title = await page.title();
  console.log("Page title : ", title);
  await expect(page).toHaveTitle("Google");
  await page.close();
});
