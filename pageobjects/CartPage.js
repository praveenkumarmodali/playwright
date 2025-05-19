const { expect } = require("@playwright/test");

class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutBtn = this.page
      .getByRole("listitem")
      .getByRole("button", { name: "Checkout" });
  }

  async verifyCartProductExistance(productName) {
    const cartProduct = this.page.getByText(productName);
    expect(await cartProduct).toBeVisible();
  }

  async goToCheckoutpage() {
    await this.checkoutBtn.click();
    await this.page.locator(".payment__title").first().waitFor();
  }
}

module.exports = { CartPage };
