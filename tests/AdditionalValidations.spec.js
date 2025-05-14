const { test, expect } = require("@playwright/test");

test("Additional validations", async ({ page }) => {
  // for going back and farword
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.goto("http://www.goole.com");
  await page.goBack();
  await page.goForward();

  //   isVisible, isHidden etc.
});

test.only("JavaScript alerts", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.locator("#alertbtn").click();
  page.on("dialog", (dialog) => dialog.accept());

  //   hover ,
});
