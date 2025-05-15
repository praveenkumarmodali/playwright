const {test,expect} = require('@playwright/test');


test.describe("Accessing and logging in-to website", async function(){
    test("test", async function({page}){
        await page.goto("https://account-test.endpointclinical.com/login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DCentralServices%26redirect_uri%3Dhttps%253A%252F%252Ftest.endpointclinical.com%252Fsignin-oidc%26response_type%3Dcode%2520id_token%2520token%26scope%3Dopenid%2520profile%2520restApi%2520offline_access%26response_mode%3Dform_post%26nonce%3D638828905269674746.MTVhNmIzZjYtNTgxMy00NmQ4LWEwOGItYzdhNzhhYWUxZDk1YTBjNjhhOTktNjRlOC00MjBlLTk3MDEtNDU4ZWNkZjdjODI2%26state%3DCfDJ8OyqCJXJsrNPiY8Yjus1wYLEyGjkUwDywnnsmo9TpYtBz7NSlxSkytSNdFjl6lMeyhbnWXobcSRJgyipMgQxEu7lZr6mdhaARdT1wqDOTVb0mmE6icWmVibuk04Bcp3GfBQZXnJl-44_3F3KamEAPyYw5ySvAGTh19m5jCgkFSyXGuKtTKwSjvKTxb3qEJECDO3Xa6zvDopegSpx59z4hvF5eQWwu4n8WYrfZd2p2cWMxkPlobcnUnQFz2fhEbQ4oN__jdp7GtQUo0cwZMWQweIMmLfqm0C7MTn36W0FG4iPNtMu4HThpx5Uv9q44daNYA%26x-client-SKU%3DID_NETSTANDARD2_0%26x-client-ver%3D5.5.0.0")
        const title = await page.title();
        console.log(title);
        
    })
    
    test("Loggin in", async function({page}){
        await page.goto("https://account-test.endpointclinical.com/login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DCentralServices%26redirect_uri%3Dhttps%253A%252F%252Ftest.endpointclinical.com%252Fsignin-oidc%26response_type%3Dcode%2520id_token%2520token%26scope%3Dopenid%2520profile%2520restApi%2520offline_access%26response_mode%3Dform_post%26nonce%3D638828905269674746.MTVhNmIzZjYtNTgxMy00NmQ4LWEwOGItYzdhNzhhYWUxZDk1YTBjNjhhOTktNjRlOC00MjBlLTk3MDEtNDU4ZWNkZjdjODI2%26state%3DCfDJ8OyqCJXJsrNPiY8Yjus1wYLEyGjkUwDywnnsmo9TpYtBz7NSlxSkytSNdFjl6lMeyhbnWXobcSRJgyipMgQxEu7lZr6mdhaARdT1wqDOTVb0mmE6icWmVibuk04Bcp3GfBQZXnJl-44_3F3KamEAPyYw5ySvAGTh19m5jCgkFSyXGuKtTKwSjvKTxb3qEJECDO3Xa6zvDopegSpx59z4hvF5eQWwu4n8WYrfZd2p2cWMxkPlobcnUnQFz2fhEbQ4oN__jdp7GtQUo0cwZMWQweIMmLfqm0C7MTn36W0FG4iPNtMu4HThpx5Uv9q44daNYA%26x-client-SKU%3DID_NETSTANDARD2_0%26x-client-ver%3D5.5.0.0")
        await page.locator("#LoginForm-userName").fill("iinvestsing_301737");
        await page.locator("#LoginForm-password").fill("p");
        await page.locator("#LoginForm-submit").click(); 
    })
})


