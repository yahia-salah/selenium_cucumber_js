const { Given, When, Then } = require("@cucumber/cucumber");
const { After, Before } = require("@cucumber/cucumber");
const chai = require("chai");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");

let driver;

var expect = chai.expect;

Before(async function () {
  console.log("Inside Before!");
  var options = new Options();
  options.addArguments("--start-maximized","--ignore-certificate-errors");
  driver = new Builder().forBrowser("chrome").setChromeOptions(options).build();
  await driver
    .manage()
    .setTimeouts({ implicit: 5 * 1000, pageLoad: 30 * 1000, script: 3 * 1000 });
});

After(async function () {
  console.log("Inside After!");
  await driver.quit();
});

Given(
  "I am navigated to {string}",
  { timeout: 30 * 1000 },
  async function (url) {
    await driver.get(url);
  }
);

When("I select Country as {string}", async function (country) {
  await driver.findElement(By.css("a#country-btn")).click();
  await driver
    .findElement(
      By.xpath(
        `//a[contains(@class,'country')]/span[contains(text(),'${country}')]/parent::a`
      )
    )
    .click();
});

Then("I verify the currency is {string}", async function (currency) {
  var trialCostText = await driver
    .findElement(By.css("div.trial-cost"))
    .getText();
  expect(trialCostText).to.contain(currency);
});

Then("I verify the prices of each package", async function (dataTable) {
  var types = dataTable.hashes().map((x) => x.Type);
  var prices = dataTable.hashes().map((x) => x.Price);

  for (var i = 0; i < types.length; i++) {
    var actualPriceText = await driver
      .findElement(
        By.xpath(`//div[@class='price' and contains(@id,'${types[i]}')]`)
      )
      .getText();
    var actualPrice = actualPriceText.split(" ")[0].trim();
    expect(actualPrice).to.equal(prices[i]);
  }
});
