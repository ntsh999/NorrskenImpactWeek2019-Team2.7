module.exports = {
  'Login Page Initial Render': function(_browser) {
    var login = _browser.page['login.po']();
    var bG= _browser.globals;
    _browser.url(bG.env+'/login'); 
    login.validateForm();
  },
  'Try to login with no username and no password': function(_browser) {
    var login = _browser.page['login.po']();
    var bG= _browser.globals;
    _browser.url(bG.env+'/login'); 
    login.submit()
      .validateError('Please enter user name', 'Please enter password');
  },
  'Try to login with a username and no password': function(_browser) {
    var login = _browser.page['login.po']();
    bG = _browser.globals;
    _browser.url(bG.env+'/login');
     login
      .fillInForm('test', '')
      .submit()
      .validatePasswordError('Please enter password');
    _browser.end();
  },

  'Try to login with a password and no username': function(_browser) {
    var login = _browser.page['login.po']();

    bG = _browser.globals;
    _browser.url(bG.env+'/login');
     login
      .fillInForm('', 'test')
      .submit()
      .validateUserNameError('Please enter user name');

    _browser.end();
  },
  'Enter wrong username and password': function(_browser) {
    var login = _browser.page['login.po']();
    bG = _browser.globals;
    _browser.url(bG.env+'/login');
     login
      .fillInForm('test', '123')
      .submit()
      .validateFormError('Username or Password is Incorrect');
    _browser.end();
  },
  'Enter a valid username and password': function(_browser) {
    var login = _browser.page['login.po']();
    bG = _browser.globals;
    _browser.url(bG.env+'/login');
     login
      .fillInForm(_browser.globals.credentials.admin.username, _browser.globals.credentials.admin.password)
      .submit()
      .validateNoError();
      bG.currentRole.role = 'admin';
    _browser.end();
  }
};
