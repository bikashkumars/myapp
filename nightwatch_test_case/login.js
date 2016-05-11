module.exports = {
  'CTL-Portal Testing Login & Dashboard Page' : function (browser) {
    browser
      .url('http://localhost/dist1/#/login')
      .pause(2000)
      .waitForElementVisible('body', 1000)
      .setValue('input[name=username]', "ctl\\ctladmin")
      .setValue('input[name=password]', 'ctladmin')
      .pause(1000)
      .click('#Loginbtn')
      .pause(1000)
      .end();
  }
};
