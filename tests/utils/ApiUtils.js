class ApiUtils {
  constructor(apiContext, loginPlayloadData) {
    this.apiContext = apiContext;
    this.loginPlayloadData = loginPlayloadData;
  }

  async getToken() {
    const loginres = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPlayloadData,
      }
    );

    const logindata = await loginres.json();
    const tokenId = logindata.token;
    return tokenId;
  }

  async crateOrder(createOrderPayload) {
    const response = {};
    response.tokenId = await this.getToken();
    const creatingOrderRes = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: createOrderPayload,
        headers: {
          Authorization: response.tokenId,
          "content-type": "application/json",
        },
      }
    );

    const createOrderData = await creatingOrderRes.json();
    console.log(createOrderData);
    const orderid = createOrderData.orders[0];
    response.orderid = orderid;

    return response;
  }
}

module.exports = { ApiUtils };
