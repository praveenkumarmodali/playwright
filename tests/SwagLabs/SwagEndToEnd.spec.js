const { test, expect } = require("@playwright/test");

test("Stand Alone Test for Succesfull Purchase", async function ({ browser }) {
  const context = await browser.newContext();
  const page = await context.newPage();
});
