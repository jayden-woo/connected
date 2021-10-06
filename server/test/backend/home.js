const expect = require('chai').expect;
const common = require('../common');
const { chromium } = require('playwright');
const username = "yihe";
const password = "hsn-123456";

describe('home page', function () {
  this.timeout(100000);

  before(async function () {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto(common.BACK_BASE_URL);
  });

  it('check title', async () => {
    const title = await page.title();
    expect(title).to.equal("Team Connected CRM");
  });

  it('check question board', async () => {
    const x = await page.innerText('#homeTab-tab-questionBoard');
    expect(x).to.equal('Question Board');
  })

  it('check survey board', async () => {
    const x = await page.innerText('#homeTab-tab-surveyBoard');
    expect(x).to.equal('Survey Board');
  })

  it('login', async () => {
    const state = await page.innerText('.nav-item');
    if (state === "LOG IN") {
      console.log('go to login......');
      await page.click("text=LOG IN");
      await page.waitForTimeout("3000");
      await page.click("input[name=\"username\"]");
      await page.fill("input[name=\"username\"]", username);
      await page.click("input[name=\"password\"]");
      await page.fill("input[name=\"password\"]", password);
      await page.click(".auth0-lock-submit");
      await page.waitForTimeout("3000");
      const url = await page.url();
      const result = url.match(new RegExp(common.BACK_BASE_URL));
      expect(result.length).to.be.above(0);
      await page.click('text=HOME');
      console.log('logined......');
    }
  })

  it('home page goto survey page', async () => {
    await page.click("text=Survey Board");
    await page.click("text=Here");
    const url = await page.url();
    expect(url).to.equal(common.BACK_BASE_URL + '/surveys');
    await page.click('text=HOME');
  })

  it('ask a question', async () => {
    console.log('ask a question......');
    await page.waitForTimeout("3000");
    await page.click("text='Ask a Question'");
    let url = await page.url();
    expect(url).to.equal(common.BACK_BASE_URL + '/posts/add');
    //cacel a question
    await page.click('text=Cancel');
    expect(await page.url()).to.equal(common.BACK_BASE_URL + '/');
    await page.waitForTimeout("1000");
    await page.click("text='Ask a Question'");
    await page.waitForTimeout("1000");
    //publish a question
    await page.click("#postTitle");
    await page.fill("#postTitle", "script to publish a title");
    await page.click("#postBody");
    await page.fill("#postBody", "script some body");
    await page.click('text=Submit');
    await page.waitForTimeout("2000");
    const url2 = await page.url();
    const result = url2.match(new RegExp(common.BACK_BASE_URL + '/posts'));
    expect(result.length).to.be.above(0);
    await page.click('text=HOME');
  })

  it('reply a question', async () => {
    console.log('reply a question......');
    await page.waitForTimeout("5000");
    await page.click('.card-title');
    const url = await page.url();
    const result = url.match(new RegExp(common.BACK_BASE_URL + '/posts'));
    expect(result.length).to.be.above(0);
    await page.waitForTimeout("5000");
    await page.fill("#postReply", "reply some code");
    await page.click('text=Publish');
    await page.waitForTimeout("5000");
    const x = await page.innerText('.container >> nth=3 >> .px-4');
    expect(x).to.be.equal("reply some code");
    await page.click('text=Edit');
    await page.click('#postBody');
    await page.fill("#postBody", "update some code");
    await page.click('text=Submit');
    await page.waitForTimeout("2000");
    const y = await page.innerText('.container >> nth=3 >> .px-4');
    expect(y).to.be.equal("update some code");
    await page.click('text=HOME');
  })

  after(async function () {
    await browser.close();
  });
});