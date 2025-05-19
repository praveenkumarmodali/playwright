class OrderPage {
  constructor(page) {
    this.page = page;
    this.rows = this.page.locator("tbody tr");
    this.expectedOrderid = this.page.locator("//div[@class='col-text -main']");
  }

  async ReadOrderTable_clickOnTheViewOrder(orderid) {
    for (let i = 0; i < (await this.rows.count()); i++) {
      const roworderId = await this.rows.nth(i).locator("th").textContent();
      if (orderid.includes(roworderId)) {
        await this.rows.nth(i).locator("button").first().click();
        break;
      }
    }
    await this.page.locator(".email-title").waitFor();
  }

  async compareExpectedOrderId_with_initial_orderId() {
    const expectedOrderidNumber = await this.expectedOrderid.textContent();
    return expectedOrderidNumber;
  }
}

module.exports = { OrderPage };
