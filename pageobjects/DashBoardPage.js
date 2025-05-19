class DashBoardPage {
  constructor(page) {
    this.page = page;
    this.products = this.page.locator(".card-body");
    this.cartBtn = this.page
      .getByRole("listitem")
      .getByRole("button", { name: "Cart" });
  }

  async addProductToCart(productName) {
    for (let i = 0; i < (await this.products.count()); i++) {
      const productText = await this.products.nth(i).locator("b").textContent();
      if (productText == productName) {
        await this.products
          .nth(i)
          .getByRole("button", { name: " Add To Cart" })
          .click();
        break;
      }
    }
  }

  async goToCart() {
    await this.cartBtn.click();
    await this.page.locator(".items").first().waitFor();
  }
}

module.exports = { DashBoardPage };
