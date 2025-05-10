const { test, expect } = require("@playwright/test");

test("resgister", async function ({ page }) {
  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title());

  const register_link = page.locator("//a[text()='Register here']");
  await register_link.click();

  const firstName = page.locator("#firstName");
  await firstName.fill("Praveen");

  const lastName = page.locator("#lastName");
  await lastName.fill("Kumar");

  const email = page.locator("#userEmail");
  await email.fill("examplepraveenmodali@gmail.com");

  const phoneNum = page.locator("#userMobile");
  await phoneNum.fill("1234556772");

  const occupation = page.locator("[formcontrolname='occupation']");
  await occupation.selectOption("Student");

  const maleBtn = page.locator("[value='Male']");
  await maleBtn.click();

  const password = page.locator("#userPassword");
  await password.fill("@12345678");

  const confirmPass = page.locator("#confirmPassword");
  await confirmPass.fill("@12345678");

  const above18CheckBox = page.locator("//input[@type='checkbox']");
  await above18CheckBox.check();

  const reg = page.locator("[value='Register']");
  await reg.click();
});

test.only("Login", async function ({ page }) {
  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title());

  const email = page.locator("#userEmail");
  await email.fill("examplepraveenmodali@gmail.com");

  const password = page.locator("#userPassword");
  await password.fill("Caazxy*28");

  const login = page.locator("[value='Login']");
  await login.click();

  const products = page.locator(".card-body b");

  await page.waitForLoadState("networkidle");
  const allTitles = await products.allTextContents();
  console.log(allTitles);

  await page.close();
});
