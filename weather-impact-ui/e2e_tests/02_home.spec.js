module.exports = {
  tags: ['home'],
  before: function(browser) {
    console.log('Before working!');
  },
  beforeEach: function(_browser) {
    console.log('Before Each working!');
    var login = _browser.page['login.po']();
    var bG = _browser.globals;
    _browser.url(bG.env+'/login');
    login
      .fillInForm(
        bG.credentials[bG.currentRole.role].username,
        bG.credentials[bG.currentRole.role].password
      )
      .submit()
      .validateNoError();
  },
  'Validate home page header for Group Admin': function(_browser) {
    var home = _browser.page['home.po']();
    var bG = _browser.globals;
    home
      .validateHeader(bG.credentials[bG.currentRole.role]);
      // changing current role to next type of user
      bG.currentRole.role = 'user';
    _browser.end();
  },
  'Validate home page header for User': function(_browser) {
    var home = _browser.page['home.po']();
    var bG = _browser.globals;
    home
      .validateHeader(bG.credentials[bG.currentRole.role]);
    // changing current role to next type of user
    bG.currentRole.role = 'platform-admin';
    _browser.end();
  },
  'Validate navigation links for Group Admin': function(_browser) {
    var home = _browser.page['home.po']();
    var bG = _browser.globals;
    home.validateNavigationLinks(bG.navigationLinks[bG.currentRole.role], bG.currentRole.role);
    _browser.end();
    bG.currentRole.role = 'user';
  },
 'Validate navigation links for User': function(_browser) {
    var home = _browser.page['home.po']();
    var bG = _browser.globals;
    home.validateNavigationLinks(bG.navigationLinks[bG.currentRole.role], bG.currentRole.role);
    _browser.end();
    bG.currentRole.role = 'platform-admin';
  },
  'Validate navigation links for Platform Admin': function(_browser) {
    var home = _browser.page['home.po']();
    var bG = _browser.globals;
    home.validateNavigationLinks(bG.navigationLinks[bG.currentRole.role], bG.currentRole.role);
    _browser.end();
  },
  'Try to download user guide for Platform Admin': function(_browser) {
    var home = _browser.page['home.po']();
    home.downloadUserGuide();
    bG.currentRole.role = 'admin';
    _browser.end();
  }
};
