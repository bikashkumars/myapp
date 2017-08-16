module.exports = {
  'Ericsson Search Test' : function (browser) {
    browser
      .url('https://www.ericsson.com/en')
      .pause(2000)
      .waitForElementVisible('body', 1000)
      .click('#glass')
      .setValue('input[name=search]', "EGI")
      .pause(1000)
      .click('input[type=submit]')
      .pause(1000)
      .end();
  }
};
