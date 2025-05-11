const { test, expect } = require("@playwright/test");

//browser invoking and basic title assertions

// successfull login
test("browser Context playwright test successful login", async function ({
  browser,
}) {
  const context = await browser.newContext();
  const page = await context.newPage();

  // ----------
  const okayBtn = page.locator("button#okayBtn");
  const username = page.locator("input#username");
  const password = page.locator("input#password");
  const user_checkbox = page.locator(
    "//label[@class='customradio'][2]/span[@class='checkmark']"
  );
  const terms = page.locator("input#terms");
  const signInBtn = page.locator("input#signInBtn");
  // -----------
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const title = await page.title();
  console.log("Page title :", title);

  await username.fill("rahulshettyacademy");
  await password.fill("learning");
  await user_checkbox.click();
  await okayBtn.click();
  await terms.click();
  await signInBtn.click();
  await page.close();
});

// un successful login
test("browser Context playwright test Standalone login", async function ({
  browser,
}) {
  const context = await browser.newContext();
  const page = await context.newPage();

  // ----------
  // login page

  const okayBtn = page.locator("button#okayBtn");
  const username = page.locator("input#username");
  const password = page.locator("input#password");
  const user_checkbox = page.locator(
    "//label[@class='customradio'][2]/span[@class='checkmark']"
  );
  const dropdown = page.locator("select.form-control");
  const terms = page.locator("input#terms");
  const signInBtn = page.locator("input#signInBtn");
  const errorMessage = page.locator("[style*='block']");

  // home page
  const products = page.locator(".card-body a");
  // -----------

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const title = await page.title();
  console.log("Page title :", title);

  //invalid login
  await username.fill("rahulshetty");
  await password.fill("learning");
  await signInBtn.click();
  console.log(await errorMessage.textContent());
  await expect(errorMessage).toContainText("Incorrect");
  //----

  // valid login
  await username.fill("");
  await username.fill("rahulshettyacademy");
  await password.fill("learning");
  await user_checkbox.click();
  await expect(user_checkbox).toBeChecked();
  await dropdown.selectOption("Teacher");
  await okayBtn.click();
  expect(await terms.isChecked()).toBeFalsy();
  await terms.check();

  await signInBtn.click();

  // home page
  console.log(await products.first().textContent());
  console.log(await products.nth(1).textContent());
  const allTitles = await products.allTextContents();
  console.log(allTitles);

  // await page.close();
});

test("Child Window Handling", async function ({ browser }) {
  const context = await browser.newContext();
  const page = await context.newPage();
  page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='document']");
  await expect(documentLink).toHaveAttribute("class", "blinkingText");

  const [page2] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);

  const redText = await page2.locator("[class*='red']").textContent();
  console.log(redText);

  await page2.close();
});
