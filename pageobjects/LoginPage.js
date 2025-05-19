class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByPlaceholder("email@example.com");
    this.password = page.getByPlaceholder("enter your passsword");
    this.loginBtn = page.getByRole("button", { value: "Login" });
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async loginApplication(email, pass) {
    await this.username.fill(email);
    await this.password.fill(pass);
    await this.loginBtn.click();
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { LoginPage };
