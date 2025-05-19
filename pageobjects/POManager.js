const { LoginPage } = require("../pageobjects/LoginPage");
const { DashBoardPage } = require("../pageobjects/DashBoardPage");
const { CartPage } = require("../pageobjects/CartPage");
const { CheckOutPage } = require("../pageobjects/CheckOutPage");
const {
  OrderConfirmationPage,
} = require("../pageobjects/OrderConfirmationPage");
const { OrderPage } = require("../pageobjects/OrderPage");

class POManager {
  constructor(page) {
    this.page = page;
    this.productName = this.productName;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashBoardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckOutPage(this.page);
    this.orderConfirmPage = new OrderConfirmationPage(this.page);
    this.orderPage = new OrderPage(this.page);
  }

  getLandingPage() {
    return this.loginPage;
  }

  getDashBoardPage() {
    return this.dashboardPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }

  getOrderConfirmPage() {
    return this.orderConfirmPage;
  }

  getOrderPage() {
    return this.orderPage;
  }
}

module.exports = { POManager };
