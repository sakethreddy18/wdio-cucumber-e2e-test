import { Given, When , Then } from "@wdio/cucumber-framework";

Given(/^Google page is opened$/ , function (){
    browser.url("https://www.google.com");
    browser.pause(8000);
    
})
