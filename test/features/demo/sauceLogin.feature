Feature: Sauce Login Feature
    @sauceLogin
    Scenario Outline: Login into SauceDemo
        Given SauceDemo login page is opened
        When Login with <Username> and <Password>
        Then Verify the login is successful with <ExpectedURL>


        Examples:
            | TestID      | Username        | Password     | ExpectedURL                              |
            | SAUCE_LG001 | standard_user   | secret_sauce | https://www.saucedemo.com/inventory.html |
