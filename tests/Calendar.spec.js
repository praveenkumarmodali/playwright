const { test, expect } = require("@playwright/test");

test("Calendar Automation test", async function ({ page }) {
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

  const monthNumber = "6";
  const day = "15";
  const year = "2027";
  const expectedDate = [monthNumber, day, year];

  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.getByText(year).click();
  await page
    .locator(".react-calendar__year-view__months__month")
    .nth(Number(monthNumber) - 1)
    .click();

  await page.locator(`//abbr[text()='${day}']`).click();

  const inputs = await page.locator(".react-date-picker__inputGroup input");
  for (let i = 0; i < inputs.length; i++) {
    const value = inputs[i].getAttribute("value");
    await expect(value).toEqual(expectedDate[i]);
  }

  await page.pause();
});
