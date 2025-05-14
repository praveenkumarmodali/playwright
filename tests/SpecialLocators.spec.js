const { test, expect } = require("@playwright/test");

test("Special Locators", async function ({ page }) {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  await page.getByPlaceholder("Password").fill("123456");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").click();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.pause();
});
