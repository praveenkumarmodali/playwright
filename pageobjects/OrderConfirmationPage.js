class OrderConfirmationPage {
  constructor(page) {
    // oder confirmation page
    this.page = page;
    this.h1 = this.page.locator("h1");
    this.orderConfirmMessage = this.page.getByText(" Thankyou for the order. ");
    this.orderId = this.page.locator(".ng-star-inserted .em-spacer-1 label");
    this.ordersbtn = this.page.locator("[routerlink*='myorders']");
  }

  async waitForOrderVisible() {
    // oder confirmation page
    await this.h1.waitFor();
    await this.orderConfirmMessage.isVisible();
  }

  async getOrderId() {
    const orderidString = await this.orderId.last().textContent();
    return orderidString;
  }

  async goToOrdersPage() {
    await this.ordersbtn.last().click();
    await this.page.locator("tbody").waitFor();
  }
}

module.exports = { OrderConfirmationPage };
