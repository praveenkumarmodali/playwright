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

test("Login", async function ({ page }) {
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

test.only("end to end StandAlone test", async function ({ page }) {
  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title());

  const email = page.locator("#userEmail");
  await email.fill("examplepraveenmodali@gmail.com");

  const password = page.locator("#userPassword");
  await password.fill("Caazxy*28");

  const login = page.locator("[value='Login']");
  await login.click();

  const products = page.locator(".card-body");

  await page.waitForLoadState("networkidle");

  const count = await products.count();
  console.log(count);

  let productText = "";
  for (let i = 0; i < count; i++) {
    productText = await products.locator("b").nth(i).textContent();

    if (productText === "IPHONE 13 PRO") {
      await products.locator("//button[text()=' Add To Cart']").nth(i).click();
      break;
    }
  }

  const cartButton = page.locator("[routerlink*='cart']");
  await cartButton.click();

  await page.locator(".items").first().waitFor();
  const cartProduct = page.locator(".cartSection h3");
  await cartProduct.isVisible();

  const cartProductText = await cartProduct.textContent();
  await expect(cartProductText.trim()).toEqual(productText.trim());
});
