class CheckOutPage {
  constructor(page) {
    this.page = page;
    this.cvvNum = this.page.locator("//div[@class='field small']/input");
    this.nameOnCard = this.page.locator("//div[@class='field']/input");
    this.defaultUsername = this.page
      .locator("//div[@class='user__name mt-5']/label")
      .textContent();
    this.country = this.page.getByPlaceholder("Select Country");
    this.placeOrderBtn = page.getByText("Place Order");
  }

  async fillCheckoutPageDetails(cvv, nameOncard) {
    await this.cvvNum.first().fill(cvv);
    await this.nameOnCard.last().fill(nameOncard);
  }

  async validateDefaultUserName(username) {
    await expect(this.defaultUsername).toEqual(username);
  }

  async selectCountry(countryInput, countryToSelect) {
    await this.country.pressSequentially(countryInput);
    await this.page.locator("[class*='ta-results']").waitFor();
    const selectCountryOption = this.page.getByRole("button", {
      name: countryToSelect,
    });
    if (countryInput == "ind") {
      await selectCountryOption.nth(1).click();
    } else {
      await selectCountryOption.nth(0).click();
    }
  }

  async placeOrder() {
    this.placeOrderBtn.click();
  }
}

module.exports = { CheckOutPage };
