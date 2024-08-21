import { Given } from "@wdio/cucumber-framework";
import chai from "chai";
import dotenv from "dotenv";
Given(/^Login to inventory web app$/, async function () {
  /** 1. Launch the browser */
  await browser.url("https://www.saucedemo.com/");

  /**2. Set the username and password */

  try {
    let userInput = await $("#user-nam");
    let passwordInput = await $("#password");
    let loginButton = await $("#login-button");

    const userName = process.env.USERNAME;
    const password = process.env.PASSWORD;
    console.log(">>GIven block...");

    await userInput.setValue(userName);
    await passwordInput.setValue(password);
    await loginButton.click();
  } catch (err) {
    console.log(`Error in first login . Retrying..`);
    await browser.refresh();
    await browser.pause(2000);
    let userInput = await $("#user-name");
    let passwordInput = await $("#password");
    let loginButton = await $("#login-button");

    const userName = process.env.USERNAME;
    const password = process.env.PASSWORD;
    console.log(">>GIven block...");

    await userInput.setValue(userName);
    await passwordInput.setValue(password);
    await loginButton.click();
  }

  // Login with another user
  //   await browser.pause(2000);
  //   await browser.reloadSession();
  //   await browser.url("https://www.saucedemo.com/");
  //   userInput = await $("#user-name");
  //   passwordInput = await $("#password");
  //   loginButton = await $("#login-button");

  //   const probUser = process.env.PR_USERNAME;
  //   await userInput.setValue(probUser);
  //   await passwordInput.setValue(password);
  //   await loginButton.click();

  await browser.pause(3000);
});
