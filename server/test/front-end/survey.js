const expect = require('chai').expect;
const common = require('../common');
const { chromium } = require('playwright');

describe('survey page', function () {
  this.timeout(300000);

  before(async function () {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto(common.BACK_BASE_URL);
  });

  it('click to survey page', async () => {
    await page.click("text=SURVEYS");
    const url = await page.url();
    expect(url).to.equal(common.BACK_BASE_URL+'/surveys');
  });

  it('goto survey page info', async () => {
    await page.waitForTimeout("3000");
    // await page.screenshot({path:'1.png', fullPage: true});
    await page.click(".sii__title");
    const url = await page.url();
    const result = url.match(new RegExp(common.BACK_BASE_URL + '/surveys'));
    expect(result.length).to.be.above(0);
    await page.click('text=HOME');
  })

  after(async function () {
    await browser.close();
  });
});