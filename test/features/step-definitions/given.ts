import { Given } from "@wdio/cucumber-framework";
import chai from "chai";
import dotenv from "dotenv";
Given(/^Login to inventory web app$/ , async function () {
    /** 1. Launch the browser */
    await browser.url("https://www.saucedemo.com/")
    await browser.setTimeout({implicit : 15000 , pageLoad: 10000})

    /**2. Set the username and password */

    let userInput = await $("#user-name");
    let passwordInput = await $("#password");
    let loginButton = await $("#login-button")

    const userName = process.env.USERNAME;
    const password = process.env.PASSWORD;
    console.log(">>GIven block...")

    await userInput.setValue(userName);
    await passwordInput.setValue(password);
    await loginButton.click();
})

