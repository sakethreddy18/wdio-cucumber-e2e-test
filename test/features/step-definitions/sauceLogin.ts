import { Given, When , Then } from "@wdio/cucumber-framework";
import * as chai from "chai";

Given (/^SauceDemo login page is opened$/, async function(){
    await browser.url("https://www.saucedemo.com/")

})

When (/^Login with (.*) and (.*)$/ , async function(userName , password) {
    let userInput = await $("#user-name");
    let passwordInput = await $("#password");
    let loginButton = await $("#login-button")
    // Trim the captured values
    userName = userName.trim();
    password = password.trim();

    console.log(`Username: ${userName}`);
    console.log(`Password: ${password}`);
    await userInput.setValue(userName);
    await passwordInput.setValue(password);
    await loginButton.click();
    await browser.pause(5000)

})

Then(/^Verify the login is successful with (.*)$/ , async function(expectedURL){
    const url = await browser.getUrl();
    chai.expect(url).to.equal(expectedURL);
})