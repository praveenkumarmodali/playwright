const { test, expect } = require("@playwright/test");

let webContext;
let username;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  // landing page
  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title());

  username = "examplepraveenmodali@gmail.com";
  const email = page.getByPlaceholder("email@example.com");
  await email.fill(username);

  const password = page.getByPlaceholder("enter your passsword");
  await password.fill("Caazxy*28");

  const login = page.getByRole("button", { value: "Login" });
  await login.click();

  await page.waitForLoadState("networkidle");

  await context.storageState({ path: "state.json" });

  webContext = await browser.newContext({ storageState: "state.json" });
});

test("end to end StandAlone test", async function () {
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  // go to products catalog
  const products = page.locator(".card-body");
  await products
    .filter({ hasText: "IPHONE 13 PRO" })
    .getByRole("button", { name: " Add To Cart" })
    .click();

  // go to cart
  const cartButton = page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" });
  await cartButton.click();

  await page.locator(".items").first().waitFor();
  const cartProduct = page.getByText("IPHONE 13 PRO");
  await cartProduct.isVisible();

  // go to checkout
  const checkoutBtn = page
    .getByRole("listitem")
    .getByRole("button", { name: "Checkout" });
  await checkoutBtn.click();

  await page.locator(".payment__title").first().waitFor();

  const cvvNum = page.locator("//div[@class='field small']/input");
  await cvvNum.first().fill("123");

  const nameOnCard = page.locator("//div[@class='field']/input");
  await nameOnCard.last().fill("Praveen");

  const defaultUsername = await page
    .locator("//div[@class='user__name mt-5']/label")
    .textContent();

  await expect(defaultUsername).toEqual(username);

  const country = page.getByPlaceholder("Select Country");
  await country.pressSequentially("ind");

  await page.locator("[class*='ta-results']").waitFor();

  const selectCountryOption = page.getByRole("button", { name: "India" });
  await selectCountryOption.nth(1).click();

  const placeOrder = page.getByText("Place Order");
  await placeOrder.click();

  // oder confirmation page
  await page.locator("h1").waitFor();
  await page.getByText(" Thankyou for the order. ").isVisible();

  const orderid = await page
    .locator(".ng-star-inserted .em-spacer-1 label")
    .last()
    .textContent();

  console.log(orderid);

  // go to orders page
  const ordersbtn = page.locator("[routerlink*='myorders']");
  await ordersbtn.last().click();

  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");
  for (let i = 0; i < (await rows.count()); i++) {
    const roworderId = await rows.nth(i).locator("th").textContent();
    if (orderid.includes(roworderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  await page.locator(".email-title").waitFor();

  const expectedOrderid = await page
    .locator("//div[@class='col-text -main']")
    .textContent();
  await expect(orderid.includes(expectedOrderid)).toBeTruthy();
  // await page.pause();
});
