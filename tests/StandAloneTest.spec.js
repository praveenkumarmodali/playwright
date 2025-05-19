const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageobjects/POManager");
const { testData } = require("../testData/placeOrderTestData");

test.describe("End to end test with multiple data sets", async function () {
  for (const data of testData) {
    test(`E2E: place order for product - ${data.productName}`, async function ({
      page,
    }) {
      let orderId;
      // Page Object Manager
      const poManager = new POManager(page);

      // landing page
      const loginPage = poManager.getLandingPage();
      await loginPage.goTo();
      await loginPage.loginApplication(data.username, data.password);

      // dashboard page
      const dashboardPage = poManager.getDashBoardPage();
      await dashboardPage.addProductToCart(data.productName);
      await dashboardPage.goToCart();

      // cart Page
      const cartpage = poManager.getCartPage();
      await cartpage.verifyCartProductExistance(data.productName);
      await cartpage.goToCheckoutpage();

      //checkout Page
      const checkoutPage = poManager.getCheckoutPage();
      await checkoutPage.fillCheckoutPageDetails(data.cvv, data.nameOncard);
      await checkoutPage.selectCountry(data.countryInput, data.countrySelect);
      await checkoutPage.placeOrder();

      //order confirmation page
      const orderConfirmPage = poManager.getOrderConfirmPage();
      await orderConfirmPage.waitForOrderVisible();
      orderId = await orderConfirmPage.getOrderId();
      await orderConfirmPage.goToOrdersPage();

      //orders page
      const orderPage = poManager.getOrderPage();
      await orderPage.ReadOrderTable_clickOnTheViewOrder(orderId);
      const expectedOrderid =
        await orderPage.compareExpectedOrderId_with_initial_orderId();

      const isMatch = orderId.includes(expectedOrderid);
      if (!isMatch) {
        console.log(`❌ Expected ${orderId} to include ${expectedOrderid}`);
      }
      await expect(isMatch).toBeTruthy();
      // await page.pause();
    });
  }
});
