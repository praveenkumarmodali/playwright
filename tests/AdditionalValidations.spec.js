const { test, expect } = require("@playwright/test");

test("Additional validations", async ({ page }) => {
  // for going back and farword
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.goto("http://www.goole.com");
  await page.goBack();
  await page.goForward();

  //   isVisible, isHidden etc.
});

test("JavaScript alerts", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.locator("#alertbtn").click();
  page.on("dialog", (dialog) => dialog.accept());

  //   hover ,
});

test("Screenshot & Visual Compation", async function ({ page }) {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await page.screenshot({ path: "screenshot.png" });
  await expect(page.locator("#hide-textbox")).toBeHidden();
});

test("visual testing using Playwright", async function ({ page }) {
  await page.goto("http://www.reddiff.com/");

  // verifies that the old Screenshot is matched with the new Screen shot
  expect(await page.screenshot()).toMatchSnapshot("landinf.png");
});
