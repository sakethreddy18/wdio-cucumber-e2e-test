import { Given, When , Then } from "@wdio/cucumber-framework";
import * as chai from "chai";

Given(/^Google page is opened$/ , async function (){
    console.log('Before opening browser ...')
    await browser.url("https://www.google.com");
   await browser.pause(3000);
   console.log('After opening browser ...')
    
})

When(/^Search with (.*)$/, async function (searchItem){
    console.log(`>> searchItem : ${searchItem}`);
    let ele = await $(`[name='q']`);
    await ele.setValue(searchItem);
    await browser.keys("Enter");
})

Then(/^Click on the first search result$/, async function(){
    let ele = await $(`<h3>`);
    ele.click();
})

Then(/^URL should match (.*)$/ , async function (expectedURL) {
    console.log(`>> expected URL : ${expectedURL}`);
    let url = await browser.getUrl();
     chai.expect(url).to.equal(expectedURL);
})


// web interactions

Given(/^A web page is opened$/ , async function (){
    await browser.url("/checkboxes");
    await browser.setTimeout({implicit: 15000 , pageLoad: 10000});
    await browser.maximizeWindow();
})
When(/^Perform web interactions$/ , async function() {
    /**
     * 1. Input Box
     * Actiopns : 
     * 1. Type into input box
     * 2. Clear the field and type or just add value.
     * 3. Click and type
     * 4. Slow typeing
     */
    // let num = 12345
    // let strNum = num.toString();
    // let ele = await $(`[type="number"]`);
    // // await ele.setValue(strNum);
    // await ele.click();

    // for(let i = 0 ; i < strNum.length ; i++){
    //     let chatStr = strNum.charAt(i)
    //     await browser.pause(1000)
    //     await browser.keys(chatStr);
    // }
    // await browser.pause(8000);

    /**
     * 2. Dropdown
     * Actions
     * 1. Assert default option is selected
     * 2. Select by attribute , text , index
     * 3. Get a list of options
     */

    // let ele =  await $('//select/option[@selected="selected"]');
    // let val = await ele.getText();
    // console.log(val)
    // chai.expect(val).to.equal("Please select an option");
   


    // Select a specific value
    // let dropDownOPtions = await $$('//select/option');
    // let optionsArr = ['Please select an option' , 'Option 1' , 'Option 2']
    // for (let i = 0 ; i < optionsArr.length ; i++){
    //     console.log(await dropDownOPtions[i].getText())
    //     chai.expect(await dropDownOPtions[i].getText()).to.equal(optionsArr[i])
    // }

    /**
     * 3. Checkbox
     * Actions:
     * 1. Select an option
     * 2. Unselect an option
     * 3. Assert an option
     * 4. Select all options
     * 
     */

    let checkBoxes = await $$(`//form[@id="checkboxes"]/input`);
    chai.expect(await checkBoxes[1].isSelected()).to.be.true;  //asserting an option
    await checkBoxes[0].click(); //selecting the 1st option
    await checkBoxes[1].click(); //unselecting the 2nd option
    chai.expect(await checkBoxes[0].isSelected()).to.be.true; // asserting an option

    //asserting all the checkboxes
    for (let i = 0 ; i < checkBoxes.length ; i++){
        console.log(await checkBoxes[i].getAttribute('value'));
        if(!await checkBoxes[i].isSelected()){
            await checkBoxes[i].click()
        }
    }
    checkBoxes.forEach(async ele =>{
        chai.expect(await ele.isSelected()).to.be.true
    })

    await browser.pause(3000) 




})

