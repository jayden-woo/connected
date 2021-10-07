const expect = require('chai').expect;
const common = require('../common');
const { chromium } = require('playwright');

describe('about page', function () {
  this.timeout(20000);

  before(async function () {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto(common.BACK_BASE_URL);
  });

  it('click to about page', async () => {
    await page.click("text=ABOUT");
    const url = await page.url();
    expect(url).to.equal(common.BACK_BASE_URL+'/about');
  });

  after(async function () {
    await browser.close();
  });
});