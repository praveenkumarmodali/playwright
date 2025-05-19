const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("./utils/apiUtils");

const loginPlayloadData = {
  userEmail: "pranakumar@gmail.com",
  userPassword: "Caazxy*28",
};

const createOrderPayload = {
  orders: [
    {
      country: "England",
      productOrderedId: "67a8df56c0d3e6622a297ccd",
    },
  ],
};

let resObject;
test.beforeAll(async function () {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPlayloadData);
  resObject = await apiUtils.crateOrder(createOrderPayload);
});

test.only("end to end StandAlone test", async function ({ page }) {
  // landing page

  //   login parsed from local storage
  await page.addInitScript(function (value) {
    window.localStorage.setItem("token", value);
  }, resObject.tokenId);

  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title());
  // go to products catalog
  await page.waitForLoadState("networkidle");

  // go to orders page
  const ordersbtn = page.locator("[routerlink*='myorders']");
  await ordersbtn.last().click();

  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");
  for (let i = 0; i < (await rows.count()); i++) {
    const roworderId = await rows.nth(i).locator("th").textContent();
    if (resObject.orderid.includes(roworderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  await page.locator(".email-title").waitFor();

  const expectedOrderid = await page
    .locator("//div[@class='col-text -main']")
    .textContent();
  await expect(resObject.orderid.includes(expectedOrderid)).toBeTruthy();
  // await page.pause();
});
