const expect = require('chai').expect;
const common = require('../common');
const { chromium } = require('playwright');
const username = "yihe";
const password = "hsn-123456";

describe('survey page', function () {
  this.timeout(300000);

  before(async function () {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto(common.FROUT_BASE_URL);
    await page.click("text=LOG IN");
    await page.waitForTimeout("3000");
    await page.click("input[name=\"username\"]");
    await page.fill("input[name=\"username\"]", username);
    await page.click("input[name=\"password\"]");
    await page.fill("input[name=\"password\"]", password);
    await page.click("button[name=\"action\"]");
    await page.waitForTimeout("3000");
  });

  it('click to survey page', async () => {
    await page.click("text=SURVEYS");
    const url = await page.url();
    expect(url).to.equal(common.FROUT_BASE_URL+'/surveys');
  });

  it('goto survey page info', async () => {
    await page.waitForTimeout("3000");
    await page.click(".sii__title");
    const url = await page.url();
    const result = url.match(new RegExp(common.FROUT_BASE_URL + '/surveys'));
    expect(result.length).to.be.above(0);
    await page.click(".sv-text");
    await page.fill(".sv-text", "this is a title");
    await page.click(".sv-btn");
    // await page.screenshot({path:'1.png', fullPage: true});
  })

  after(async function () {
    await browser.close();
  });
});