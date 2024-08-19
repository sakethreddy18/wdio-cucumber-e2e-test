import { Then } from "@wdio/cucumber-framework";
import * as chai from "chai";

Then(/^Inventory page should list (.*)$/ , async function(noOfProducts) {

    if(!noOfProducts){
        throw Error (`Invalid product count provided : ${noOfProducts}`)
    }

    let eleArr = await $$(".inventory_item")
    chai.expect(eleArr.length).to.equal(parseInt(noOfProducts))
})



Then(/^Validate all products have valid price$/ , async function (){
   let priceList = await $$(".inventory_item_price")
   let priceStrArr = []
   for(let i = 0 ; i < priceList.length ; i++){
    let priceStr = await priceList[i].getText()
    priceStrArr.push(priceStr);
   }

   console.log(`>> Price with $: ${priceStrArr}`)

   let priceNumArr = priceStrArr.map(ele => {
    return +(ele.replace("$" , ""))
   })

   console.log(`>> Price : ${priceNumArr}`)

   let filterPrice = priceNumArr.filter(ele => {
    return ele <= 0
   })

   chai.expect(filterPrice.length).to.equal(0)

})