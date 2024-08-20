import { Given, When, Then } from "@wdio/cucumber-framework";
import * as chai from "chai";
import fs from "fs";

Given(/^Google page is opened$/, async function () {
  console.log("Before opening browser ...");
  await browser.url("https://www.google.com");
  await browser.pause(3000);
  console.log("After opening browser ...");
});

When(/^Search with (.*)$/, async function (searchItem) {
  console.log(`>> searchItem : ${searchItem}`);
  let ele = await $(`[name='q']`);
  await ele.setValue(searchItem);
  await browser.keys("Enter");
});

Then(/^Click on the first search result$/, async function () {
  let ele = await $(`<h3>`);
  ele.click();
});

Then(/^URL should match (.*)$/, async function (expectedURL) {
  console.log(`>> expected URL : ${expectedURL}`);
  await browser.waitUntil(async function(){
    return await browser.getTitle() === "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO"
  }, {timeout: 2000 , interval : 500 , timeoutMsg:`Failed Loading ${await browser.getTitle()}`})
  let url = await browser.getUrl(); 
  chai.expect(url).to.equal(expectedURL);
});

// web interactions

Given(/^A web page is opened$/, async function () {
  await browser.url("/tables");
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();
});
When(/^Perform web interactions$/, async function () {
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

  // let checkBoxes = await $$(`//form[@id="checkboxes"]/input`);
  // chai.expect(await checkBoxes[1].isSelected()).to.be.true;  //asserting an option
  // await checkBoxes[0].click(); //selecting the 1st option
  // await checkBoxes[1].click(); //unselecting the 2nd option
  // chai.expect(await checkBoxes[0].isSelected()).to.be.true; // asserting an option

  // //asserting all the checkboxes
  // for (let i = 0 ; i < checkBoxes.length ; i++){
  //     console.log(await checkBoxes[i].getAttribute('value'));
  //     if(!await checkBoxes[i].isSelected()){
  //         await checkBoxes[i].click()
  //     }
  // }
  // checkBoxes.forEach(async ele =>{
  //     chai.expect(await ele.isSelected()).to.be.true
  // })

  /**
   * 4. Window handling
   * Steps:
   * 1. Launch the browser
   * 2. Open another windows
   * 3. Switch to the window based on title
   * 4. Switch back to the main window
   *
   * Methods Used
   * 1. getTitle()
   * 2. getWindowHandle()
   * 3. getWindowHandles()
   * 4. switchToWindow()
   */

  //open new windows
  // await $(`=Click Here`).click()
  // await $(`=Elemental Selenium`).click()
  // let currentWinTittle = await browser.getTitle();
  // console.log(`>> currentWinTitle: ${currentWinTittle}`)

  // //Switch to specific window
  // let winHandles = await browser.getWindowHandles()
  // for(let i = 0 ; i < winHandles.length ; i++){
  //     console.log(`Window handle : ${winHandles[i]}`);
  //     await browser.switchToWindow(winHandles[i])
  //     currentWinTittle = await browser.getTitle();

  //     if(currentWinTittle === "Home | Elemental Selenium"){
  //         await browser.switchToWindow(winHandles[i])
  //         let headerTxtEleSel = (await $(`<h1>`)).getText();
  //         console.log(`>> headerTxtEleSel : ${headerTxtEleSel}`)
  //         break
  //     }
  // }

  /**
   * 5. Handling alerts
   * Methods used
   * 1. isAlertOpen() -> boolean to check if alert prompt is opened is not
   * 2. acceptAlert()
   * 3. dismissAlert()
   * 4. getAlertText()
   * 5. sendAlert()
   *
   */

  // await $(`button=Click for JS Alert`).click()
  // if(await browser.isAlertOpen()){
  //     await browser.acceptAlert();
  // }

  /**
   * 5. File upload
   *
   */

  // await $("#file-upload").addValue(`${process.cwd()}/data/dymmy.txt`);
  // await $("#file-submit").click()

  /**
   * 6. Frames
   * Methods used:
   * 1. switchToFrame
   * 2. switchToParentFrame
   */

  // (await $(`=iFrame`)).click()

  /**
   * 7. Tables
   * Topics
   * 1. Check the number of rows and columns
   * 2. Get whole table data
   * 3. Get single row based on condition
   * 4. Get single column
   * 5. Get single cell value [based on another cell]
   */

  //Row and column count
  let rowCount = await $$(`//table[@id="table1"]/tbody/tr`).length;
  console.log(`>> Number of rows : ${rowCount}`);
  chai.expect(rowCount).to.equal(4);

  let colCount = await $$(`//table[@id="table1"]/thead/tr/th`).length;
  console.log(`>> Number of columns : ${colCount}`);
  chai.expect(colCount).to.equal(6);

  //Get the whole table data
  // let tableDataArr = [];
  //  for(let i = 1 ; i <= rowCount ; i++){
  //     let personObj = {
  //         lastname : "",
  //         firstname : "",
  //         email: "",
  //         due:"",
  //         web:"",

  //     }

  //     for( let j = 1 ; j < colCount ; j++){
  //         let ele =  await $(`//*[@id="table1"]/tbody/tr[${i}]/td[${j}]`).getText()
  //         switch (j){
  //             case 1:
  //                 personObj.lastname = ele;
  //                 break;

  //             case 2:
  //                 personObj.firstname = ele;
  //                 break;

  //             case 3:
  //                 personObj.email = ele;
  //                 break;

  //             case 4:
  //                 personObj.due = ele;
  //                 break;

  //             case 5:
  //                 personObj.web = ele;
  //                 break

  //         }
  //     }
  //     tableDataArr.push(personObj);
  //  }
  //  const jsonData = JSON.stringify(tableDataArr, null, 2);
  //  fs.writeFileSync(`${process.cwd()}/debug/temp.json` , jsonData , 'utf-8')

  // 3. Get a single row based on condition
  // let tableDataArr = [];
  //  for(let i = 1 ; i <= rowCount ; i++){
  //     let personObj = {
  //         lastname : "",
  //         firstname : "",
  //         email: "",
  //         due:"",
  //         web:"",

  //     }

  //     for( let j = 1 ; j < colCount ; j++){
  //         let ele =  await $(`//*[@id="table1"]/tbody/tr[${i}]/td[${j}]`).getText()
  //         let firstName = await $(`//*[@id="table1"]/tbody/tr[${i}]/td[${2}]`).getText()
  //         if(firstName === 'Jason'){
  //             switch (j){
  //                 case 1:
  //                     personObj.lastname = ele;
  //                     break;

  //                 case 2:
  //                     personObj.firstname = ele;
  //                     break;

  //                 case 3:
  //                     personObj.email = ele;
  //                     break;

  //                 case 4:
  //                     personObj.due = ele;
  //                     break;

  //                 case 5:
  //                     personObj.web = ele;
  //                     break

  //             }
  //         }

  //     }
  //     if (Object.values(personObj).every(value => value !== "")) {
  //         tableDataArr.push(personObj);
  //     }

  //  }
  //  const jsonData = JSON.stringify(tableDataArr, null, 2);
  //  fs.writeFileSync(`${process.cwd()}/debug/temp.json` , jsonData , 'utf-8')

  // 4. Get single column
  // let singleColArr = []
  // let col = 4;
  // for(let i = 0 ; i < rowCount ; i++){
  //     let ele =  await $(`//*[@id="table1"]/tbody/tr[${i+1}]/td[${col}]`).getText()
  //     singleColArr.push(ele)
  // }

  // console.log(`>> Column data : ${singleColArr}`)

  // 5. Get single cell value based on other cell value

  // let res = [];
  // for (let i = 0; i < rowCount; i++) {
  //   for (let j = 0; j < colCount; j++) {
  //     let ele = await $(
  //       `//*[@id="table1"]/tbody/tr[${i + 1}]/td[${j + 1}]`
  //     ).getText();
  //     if (j + 1 === 4) {
  //       let price = +ele.replace("$", "");
  //       if (price > 50) {
  //         let finalCellVal = await $(
  //           `//*[@id="table1"]/tbody/tr[${i + 1}]/td[2]`
  //         ).getText();
  //         res.push(finalCellVal);
  //       }
  //     }
  //   }
  // }
  // console.log(`>> Result : ${res}`);

  /**
   * 6. Scrolling
   */

  await browser.pause(3000);
});
